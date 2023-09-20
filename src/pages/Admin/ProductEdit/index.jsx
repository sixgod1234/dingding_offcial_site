import React, { useEffect, useState, useRef } from 'react'
import { message, Spin, Select, Button, Space, Form, Input } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import Upload from '../../../components/Upload'
import NewsEdit from '../../../components/NewsEdit'
import '../../../editor.css'
import { addProduct, editProduct, getProductDetail } from '../../../api/product'

const { Item } = Form
const ProductEdit = () => {
    const ref = useRef()
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state || {}
    const { type: pageType, id, productList = [] } = state

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        if (pageType === 'edit') {
            id && handleDetail(id)
        }
    }, [])

    const handleDetail = async (id) => {
        try {
            setLoading(true)
            const data = await getProductDetail(id)
            setData(data || {})
            const { image } = data
            form.setFieldsValue({ ...data, image: [{ url: image }] })
            ref.current?.setHtml?.(data.description || '')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const onFinish = async (values) => {
        try {
            setButtonLoading(true)
            const description = ref.current?.html
            // const { type } = selectedNode
            const { image: img } = values
            const image = img[0].url || ''
            const createTime = Date.now()
            console.log({ ...values, description, image, createTime })
            pageType === 'add' ?
                await addProduct({ ...values, description, image, createTime }) :
                await editProduct({ ...data, ...values, description, image, createTime })
            setButtonLoading(false)
            message.success('操作成功')
            navigate(-1)
        } catch (error) {
            setButtonLoading(false)
            console.log(error)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={styles['container']}>
                <h3 className={styles['edit-header']}>{pageType === 'add' ? '新增' : '编辑'}产品信息</h3>
                <Form onFinish={onFinish} colon={false} form={form}>
                    <Item name="name" label="产品名称" rules={[{ required: true, message: "产品名称必填" }]}>
                        <Input placeholder={'请输入产品名称'} />
                    </Item>
                    <Item name="image" label="产品图片" rules={[{ required: true, message: "产品图片必填" }]} style={{ height: '118px' }}>
                        <Upload />
                    </Item>
                    {/* <Item name="module" label="所属模块" rules={[{ required: true, message: "所属模块必填" }]}>
                    <Select options={moduleOptions} placeholder={'请选择所属模块'} />
                </Item> */}
                    <Item name="type" label="产品类型" rules={[{ required: true, message: "产品类型必填" }]}>
                        <Select options={productList || []} placeholder={'请选择产品类型'} fieldNames={{ label: 'name', value: 'id' }} />
                    </Item>
                    <Item name="profile" label="产品简介" rules={[{ required: true, message: "产品简介必填" }]}>
                        <Input />
                    </Item>
                    <Item name="description" label="产品内容" required rules={[{
                        validator: (_, value) => {
                            if (ref.current?.text.trim().length === 0) {
                                return Promise.reject("产品内容必填")
                            }
                            return Promise.resolve()
                        }
                    }]}>
                        <NewsEdit ref={ref} />
                    </Item>
                    <div className={styles['action-container']}>
                        <Space>
                            <Button onClick={() => navigate(-1)}>返回</Button>
                            <Button type="primary" htmlType="submit" loading={buttonLoading}>提交</Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </Spin>
    )
}

export default ProductEdit