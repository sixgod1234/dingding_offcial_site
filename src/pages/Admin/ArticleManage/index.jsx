import React, { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Space, TreeSelect, Table, Drawer, Button, Modal, Form, Input, Tree, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import styles from './index.module.scss'
import { newsCategory, typeMap, newsCategoryDis } from './constant'
import {
    addNewsCategory, editNewsCategory, deleteNewsCategory, getTypeCategory, getNewsList, delteNews, getNewsCategoryList,
} from '../../../api/article'

const { Item } = Form
const ArticleManage = () => {
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const navigate = useNavigate();
    let typeArr = ['information', 'solution', 'case']

    const [visible, setVisible] = useState(false)
    const [drawerVisble, setDrawerVisble] = useState(false)
    const [modalData, setModalData] = useState({ type: '0', id: '' })
    const [treeData, setTreeData] = useState(newsCategory)
    const [selectedNode, setSelectedNode] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const [loading, setLoading] = useState(false)
    const [treeDateMap, setTreeDataMap] = useState({
        information: new Map(),
        solution: new Map(),
        case: new Map(),
    })

    useEffect(() => {
        handleTypeCategory()
        onFinish(null, pageNum, pageSize)
    }, [])

    const onFinish = async (values, nPage = 1, nPageSize = pageSize) => {
        try {
            (nPage && nPage !== pageNum) && setPageNum(nPage);
            (nPageSize && nPageSize !== pageSize) && setPageSize(nPageSize);
            setLoading(true);
            const formValues = form1.getFieldsValue()
            const { category, name } = formValues
            const { type: types, children, value } = selectedNode
            const type = category === '全部' ? '' : types
            const data = await getNewsList((category === '全部' || !category || typeArr.includes(category)) ? '' : category, name || '', typeArr.includes(category) ? category : (type || ''), nPage || pageNum, nPageSize || pageSize)
            setDataSource(data.list || [])
            setTotal(data.total || 0)
            setSelectedNode({ label: '' }) //每次搜索完都清空缓存的选中数据
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    const handleAdd = (record, type = '0') => {
        setModalData({ type, id: record?.value })
        setVisible(true)
        form.setFieldsValue(type === '0' ?
            { type: undefined, name: '' } : { type: record.type, name: record.label }
        )
    }

    const handleTypeCategory = async () => {
        try {
            const data = newsCategory.map(async (item) => {
                const typeChildren = await getTypeCategory(item.value)
                treeDateMap[item.value] = new Map(typeChildren.map((item) => [item.id, item.name]))
                const newChildren = typeChildren.map((item) => ({ label: item.name, value: item.id, type: item.type }))
                return { ...item, children: newChildren || [] }
            })
            const newCategory = await Promise.all(data)
            setTreeData(newCategory)
            setTreeDataMap({ ...treeDateMap })
        } catch (err) {
            console.log(err)
        }
    }

    const closeDrawer = () => {
        setDrawerVisble(false)
    }

    const handleOk = async (type = "0", id) => {
        try {
            const data = await form.validateFields()
            if (treeDateMap?.[data.type]?.size > 5) {
                message.warning('每个分类下最多增加6个分类')
                return
            }
            type === '0' ? await addNewsCategory(data) : await editNewsCategory({ id, ...data })
            handleTypeCategory()
            message.success('操作成功')
            setVisible(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleDelete = async (id) => {
        try {
            await deleteNewsCategory(id)
            handleTypeCategory()
            message.success('删除成功')
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditNews = async (record) => {
        navigate('/admin/article-edit', { state: { type: 'edit', data: record, treeData } })
    }

    const handleDeleteNews = async (id) => {
        try {
            await delteNews(id)
            onFinish(null, 1, pageSize)
            message.success('删除成功')
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
            render: (text, record, index) => index + 1,
        },
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
            width: 140,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '发布日期',
            dataIndex: 'publicDate',
            key: 'publicDate',
            width: 100,
            ellipsis: true,
            render: (text) => text ? moment(Date.parse(text) || parseInt(text)).format('YYYY-MM-DD') : '',
        },
        {
            title: '文章分类',
            dataIndex: 'type',
            key: 'type',
            width: 160,
            ellipsis: true,
            render: (text, record) => typeMap.get(text) + ' / ' + (treeDateMap[text]?.get?.(record['category']) || '-'),
        },
        {
            title: '产品描述',
            dataIndex: 'subName',
            key: 'subName',
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
                        <Button type="link" onClick={() => handleEditNews(record)}>编辑</Button>
                        <Button type="link" style={{ color: "red" }} onClick={() => handleDeleteNews(record.id)}>删除</Button>
                    </Space>
                )
            },
        },
    ]

    return (
        <div className={styles['product-manage-container']}>
            <div className={styles['product-title']}>
                文章列表
            </div>
            <div className={styles['product-action']}>
                <Form onFinish={onFinish} layout="inline" colon={false} form={form1}>
                    <Item name="category" label="文章分类">
                        <TreeSelect
                            showSearch
                            style={{ width: '200px' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeDefaultExpandAll
                            treeData={[{ label: "全部", value: '全部' }, ...(treeData.map((item) => ({ ...item, disabled: false })))]}
                            fieldNames={{ title: 'label', key: 'value', children: 'children' }}
                            placeholder="请选择文章类型"
                            onSelect={(value, label) => { console.log(label); setSelectedNode(label) }}
                        />
                    </Item>
                    <Item name="name" label="文章标题">
                        <Input placeholder="请输入文章标题" />
                    </Item>
                </Form>
                <div>
                    <Button onClick={() => { form1.resetFields(); onFinish(null, 1, pageSize); }}>重置</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={onFinish}>搜索</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => setDrawerVisble(true)}>文章分类</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => navigate('/admin/article-edit', { state: { type: 'add', treeData } })}>新增文章</Button>
                </div>
            </div>
            <Table
                rowKey={'id'}
                dataSource={dataSource}
                loading={loading}
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
                title={`${modalData.type === '0' ? '新增' : '编辑'}分类`}
                cancelText="取消"
                okText="确定"
                open={visible}
                onCancel={handleCancel}
                onOk={() => handleOk(modalData.type, modalData.id)}>
                <Form form={form} style={{ padding: '24px', height: "160px" }} labelCol={{ span: 6 }}>
                    <Item name="type" label="所属文章类型" rules={[{ required: true, message: "所属文章类型必填" }]}>
                        <TreeSelect
                            showSearch
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeDefaultExpandAll
                            treeData={newsCategory.map((item) => ({ ...item, disabled: false }))}
                            fieldNames={{ title: 'label', key: 'value', children: 'children' }}
                            placeholder="请选择所属文章类型"
                        />
                    </Item>
                    <Item
                        name="name"
                        label='分类名称'
                        rules={[{ required: true, message: '分类名称必填' }]}>
                        <Input placeholder={`请输入分类名称`} />
                    </Item>
                </Form>
            </Modal>

            <Drawer title='文章分类' placement="right" onClose={closeDrawer} open={drawerVisble} footer={
                <Space>
                    <Button onClick={closeDrawer}>取消</Button>
                    <Button type="primary" onClick={() => handleAdd(null, '0')}>
                        新增文章分类
                    </Button>
                </Space>
            }
                footerStyle={{ textAlign: "right" }}
            >
                <Tree
                    showLine
                    defaultExpandAll
                    treeData={treeData}
                    fieldNames={{ title: 'label', key: 'value', children: 'children' }}
                    titleRender={(nodeData) => <div className={styles['tree-item-container']} key={nodeData.value}>
                        <span title={nodeData.label}>{nodeData.label}</span>
                        <Space style={{ display: nodeData.value === 'information' || nodeData.value === 'solution' || nodeData.value === 'case' ? 'none' : '' }}>
                            <a className={styles['list-action']} type="link" onClick={() => handleAdd(nodeData, '1')}>编辑</a>
                            <a className={styles['list-action-delete']} type="link" onClick={() => handleDelete(nodeData.value)}>删除</a>
                        </Space>
                    </div>}
                />
            </Drawer>
        </div >
    )
}

export default ArticleManage