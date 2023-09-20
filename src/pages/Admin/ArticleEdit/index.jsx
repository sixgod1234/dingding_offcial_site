import React, { useEffect, useState, useRef } from 'react'
import { message, Table, TreeSelect, Button, Space, Form, Input } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import Upload from '../../../components/Upload'
import NewsEdit from '../../../components/NewsEdit'
import '../../../editor.css'
import { newsCategory } from '../ArticleManage/constant'
import {
    getNewsCategoryList, addNews, editNews, getNewsDetail,
} from '../../../api/article'

const { Item } = Form
const ArticleEdit = () => {
    const [selectedNode, setSelectedNode] = useState({})
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const ref = useRef()
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state || {}
    const { type: pageType, data = {}, treeData = [] } = state
    // console.log(state)

    useEffect(() => {
        if (pageType === 'edit') {
            const { image } = data
            form.setFieldsValue({ ...data, image: [{ url: image }] })
            // console.log(ref.current)
            ref.current?.setHtml?.(data.description || '')
        }
    }, [])

    const onFinish = async (values) => {
        try {
            setButtonLoading(true)
            const description = ref.current?.html
            const { type } = selectedNode
            const { image: img } = values
            const image = img[0].url || ''
            const publicDate = Date.now()
            pageType === 'add' ?
                await addNews({ ...values, description, type, image, publicDate }) :
                await editNews({ ...data, ...values, description, image, publicDate, ...(type ? { type } : {}) })
            message.success('操作成功')
            navigate(-1)
            setButtonLoading(false)
        } catch (err) {
            setButtonLoading(false)
            console.log(err)
        }
    }

    return (
        <div className={styles['container']}>
            <h3 className={styles['edit-header']}>{pageType === 'add' ? '新增' : '编辑'}文章信息</h3>
            <Form onFinish={onFinish} colon={false} form={form}>
                <Item name="name" label="文章标题" rules={[{ required: true, message: "文章标题必填" }]}>
                    <Input placeholder="请输入文章标题" />
                </Item>
                <Item name="image" label="封面图" rules={[{ required: true, message: "封面图必填" }]} style={{ height: '118px' }}>
                    <Upload />
                </Item>
                <Item name="category" label="文章类型" rules={[{ required: true, message: "文章类型必填" }]}>
                    <TreeSelect
                        showSearch
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        treeData={[{ label: "全部", value: '全部' }, ...treeData]}
                        fieldNames={{ title: 'label', key: 'value', children: 'children' }}
                        treeData={treeData}
                        onSelect={(value, label) => setSelectedNode(label)}
                        placeholder="文章类型必填"
                    />
                </Item>
                <Item name="subName" label="文章简介" rules={[{ required: true, message: "文章内容必填" }]}>
                    <Input placeholder="请输入文章标题" />
                </Item>
                <Item name="description" label="文章内容" required rules={[{
                    validator: (_, value) => {
                        if (ref.current?.text.trim().length === 0) {
                            return Promise.reject("文章内容必填")
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
    )
}

export default ArticleEdit