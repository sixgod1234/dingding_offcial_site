import React, { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { List, Drawer, Table, Select, Button, Modal, Form, Input, Space, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import {
    addProductType,
    editProductType,
    deleteProductType,
    getProductTypeList,
    addProductList,
    deleteProduct
} from '../../../api/product'
import moment from 'moment'

const { Item } = Form
const ProductManage = () => {
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false)
    const [modalData, setModalData] = useState({ type: '0', name: 'module', label: '模块名称', action: 'add', data: {} })

    const [drawerData, setDrawerVisbleData] = useState({ visible: false })
    const [productList, setProductList] = useState([])
    const [productMap, setProductMap] = useState(new Map())
    const [moduleList, setModuleList] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const [loading, setLoading] = useState(false)

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        handleProductTypeList()
        onFinish(null, pageNum, pageSize)
    }, [])

    // 获取产品类型数据
    const handleProductTypeList = async () => {
        const data = await getProductTypeList(100)
        data?.list?.map((item, index) => productMap.set(item.id, item))
        setProductList(data?.list || [])
    }

    // 请求表格数据
    const onFinish = async (values, nPage = 1, nPageSize = pageSize) => {
        try {
            (nPage && nPage !== pageNum) && setPageNum(nPage);
            (nPageSize && nPageSize !== pageSize) && setPageSize(nPageSize);
            setLoading(true);

            const formValues = form1.getFieldsValue()
            const { module, type, name = "" } = formValues
            const data = await addProductList(name, nPage || pageNum, nPageSize || pageSize)
            setProductMap(productMap)
            setTotal(data.total || 0)
            setDataSource(data.list || [])
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    // 设置弹框数据
    const handleModalVisible = (type = '0', action = "add", data = {}) => {
        setVisible(true)
        if (type === '0') {
            // setModalData({ type, name: 'module', label: '模块', action, data })
            // action = "edit" && form.setFieldsValue({ name: data.name })
        }
        if (type === '1') {
            setModalData({ type, name: 'name', label: '产品类型', action, data })
            action = "edit" && form.setFieldsValue({ name: data.name, enName: data.enName })
        }
    }

    // 设置抽屉数据
    const handleDrawerVisible = (type = '0') => {
        if (type === '0') {
            setDrawerVisbleData({ visible: true, type: '0', name: 'module', label: '模块' })
        }
        if (type === '1') {
            setDrawerVisbleData({ visible: true, type: '1', name: 'name', label: '产品类型' })
        }
    }

    // 新增/编辑弹框信息
    const hanleAddOrEdit = async (type = "0", action = 'add', data = {}) => {
        try {
            const values = await form.validateFields()
            if (type === '0') {
            }
            if (type === '1') {
                if (action === 'add') {
                    if (productList.length > 99) {
                        message.warning('最多可增加100种产品类型')
                        return
                    }
                    if (values?.name) {
                        const filterData = productList.filter((item) => item.name === values.name)
                        console.log(filterData)
                        if (filterData.length > 0) {
                            message.warning('产品类型中文名称相同')
                            return
                        }
                    }
                }
                action === 'add' ? await addProductType(values) : await editProductType({ ...data, ...values })
                handleProductTypeList()
                form.resetFields()
            }
            message.success('操作成功')
            setVisible(false)
        } catch (err) {
            console.log(err)
        }
    }

    // 删除产品类型/模块数据
    const handleDelete = async (type = '0', id) => {
        try {
            if (type === '0') {

            }
            if (type === '1') {
                await deleteProductType(id)
                handleProductTypeList()
            }
            message.success('操作成功')
        } catch (err) {
            console.log(err)
        }
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            render: (text, _, index) => index + 1,
        },
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'name',
            width: 160,
            ellipsis: true,
            render: (text) => text ? moment(Date.parse(text) || parseInt(text)).format('YYYY-MM-DD') : '',
        },
        {
            title: '产品类型中文名',
            dataIndex: 'zh',
            key: 'zh',
            width: 160,
            ellipsis: true,
            render: (text, record) => productMap.get(record.type)?.name || '-',
        },
        {
            title: '产品类型英文名',
            dataIndex: 'en',
            key: 'en',
            width: 160,
            ellipsis: true,
            render: (text, record) => productMap.get(record.type)?.enName || '-',
        },
        {
            title: '产品简介',
            dataIndex: 'profile',
            key: 'profile',
            width: 220,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (text, record) => {
                return (
                    <Space>
                        <Button type="link" onClick={() => hanleEditProduct(record)}>编辑</Button>
                        <Button type="link" style={{ color: "red" }} onClick={() => hanleDeleteProduct(record.id)}>删除</Button>
                    </Space>
                )
            },
        },
    ]

    const hanleEditProduct = async (record) => {
        navigate('/admin/product-edit', { state: { type: 'edit', id: record.id, productList } })
    }

    const hanleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id)
            onFinish(null, 1, pageSize)
            message.success('删除成功')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className={styles['product-manage-container']}>
            <div className={styles['product-title']}>
                产品列表
            </div>
            <div className={styles['product-action']}>
                <Form onFinish={onFinish} layout="inline" colon={false} form={form1}>
                    {/* <Item name="module" label="所属模块" initialValue={'全部'}>
                        <Select style={{ width: "200px" }} options={[{ name: '全部', id: '全部' }, ...moduleList]} fieldNames={{ label: 'name', value: 'id', options: 'options', groupLabel: 'label' }} />
                    </Item>
                    <Item name="type" label="产品类型" initialValue={'全部'}>
                        <Select style={{ width: "200px" }} options={[{ name: '全部', id: '全部' }, ...productList]} fieldNames={{ label: 'name', value: 'id' }} />
                    </Item> */}
                    <Item name="name" label="产品名称">
                        <Input placeholder="请输入产品名称" />
                    </Item>
                </Form>
                <div>
                    <Button onClick={() => { form1.resetFields(); onFinish(null, 1, pageSize) }}>重置</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={onFinish}>搜索</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => handleDrawerVisible('1')}>产品类型</Button>
                    {/* <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => handleDrawerVisible('0')}>模块</Button> */}
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => navigate('/admin/product-edit', { state: { type: 'add', id: '', productList } })}>新增产品</Button>
                </div>
            </div>
            <Table
                loading={loading}
                owKey={'id'}
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    defaultPageSize: 10,
                    pageSize,
                    current: pageNum,
                    total,
                    showSizeChanger: true,
                    onChange: (page, nPageSize) => {
                        page !== pageNum && setPageNum(page);
                        nPageSize !== pageSize && setPageSize(nPageSize);
                        onFinish(null, page, nPageSize)
                    }
                }}
            />

            <Modal
                title={(modalData.action === 'add' ? "新增" : '编辑') + (modalData.label)}
                cancelText="取消"
                okText="确定"
                open={visible}
                onCancel={() => {
                    form.resetFields()
                    setVisible(false)
                }}
                onOk={() => hanleAddOrEdit(modalData.type, modalData.action, modalData.data)}>
                <Form form={form} style={{ padding: '24px', height: "100px" }}>
                    <Item
                        name={modalData.name}
                        label={modalData.label + '中文'}
                        rules={[{ required: true, message: `${modalData.label}中文必填` }]}>
                        <Input placeholder={`请输入${modalData.label}中文名称`} />
                    </Item>
                    <Item
                        name='enName'
                        label={modalData.label + '英文'}
                        rules={[{ required: true, message: `${modalData.label}英文必填` }]}>
                        <Input placeholder={`请输入${modalData.label}英文名称`} />
                    </Item>
                </Form>
            </Modal>

            <Drawer title={drawerData.label} placement="right" onClose={() => setDrawerVisbleData({ visible: false })} open={drawerData.visible} footer={
                <Space>
                    <Button onClick={() => setDrawerVisbleData({ visible: false })}>取消</Button>
                    <Button type="primary" className={styles['drawer-action']} onClick={() => handleModalVisible(drawerData.type, 'add')}>
                        新增{drawerData.label}
                    </Button>
                </Space>
            }
                footerStyle={{ textAlign: "right" }}
            >
                <List
                    bordered
                    dataSource={drawerData.type === '0' ? moduleList : productList}
                    renderItem={(item) =>
                        <div className={styles['list-item']} title={item.name} key={item.id}>
                            <div className={styles['list-content']}>
                                {item.name || '-'}
                            </div>
                            <Space>
                                <Button className={styles['list-action']} type="link" onClick={() => handleModalVisible(drawerData.type, 'edit', item)}>编辑</Button>
                                <Button className={styles['list-action-delete']} type="link" onClick={() => handleDelete(drawerData.type, item.id)}>删除</Button>
                            </Space>
                        </div>}
                />

            </Drawer >
        </div >
    )
}

export default ProductManage