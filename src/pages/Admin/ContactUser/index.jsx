import React, { useState, useEffect } from 'react'
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Upload, message, Table, Select, Button, Modal, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import styles from './index.module.scss'
import { getContactList, deleteContact } from '../../../api/contact'

const { Item } = Form
const ContactUser = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        onFinish(null, pageNum, pageSize)
    }, [])

    const onFinish = async (values, nPage = 1, nPageSize = pageSize) => {
        // console.log(nPage, nPageSize)
        try {
            (nPage && nPage !== pageNum) && setPageNum(nPage);
            (nPageSize && nPageSize !== pageSize) && setPageSize(nPageSize);
            setLoading(true);
            const formValues = form.getFieldsValue()
            const { name } = formValues
            const data = await getContactList(name || '', nPage || pageNum, nPageSize || pageSize)
            setDataSource(data.list || [])
            setTotal(data.total || 0)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        if (id) {
            try {
                await deleteContact(id)
                onFinish(null, 1, pageSize)
                message.success('删除成功')
            } catch (err) {
                console.log(err)
            }
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
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 160,
            ellipsis: true,
            render: (text) => text ? moment(Date.parse(text) || parseInt(text)).format('YYYY-MM-DD') : '',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            width: 140,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '省/市',
            dataIndex: 'province',
            key: 'province',
            width: 175,
            ellipsis: true,
            render: (text, record) => text && (text + ' / ' + record['city']),
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 180,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '留言',
            dataIndex: 'description',
            key: 'description',
            width: 220,
            ellipsis: true,
            render: (text) => text,
        },
        {
            title: '操作',
            width: 80,
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button type="link" style={{ color: "red" }} onClick={() => handleDelete(record.id)}>删除</Button>,
        }
    ]


    return (
        <div className={styles['product-manage-container']}>
            <div className={styles['product-title']}>
                文章列表
            </div>
            <div className={styles['product-action']}>
                <Form onFinish={onFinish} layout="inline" colon={false} form={form}>
                    <Item name="name" >
                        <Input style={{ width: "300px" }} placeholder="请输入姓名" />
                    </Item>
                </Form>
                <div>
                    <Button onClick={() => { form.resetFields(); onFinish(null, 1, pageSize) }}>重置</Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} onClick={onFinish}>搜索</Button>
                </div>
            </div>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                // scroll={{ x: 1400 }}
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
        </div >
    )
}

export default ContactUser