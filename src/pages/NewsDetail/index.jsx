import React, { useEffect, useState } from 'react'
import { Breadcrumb, Divider, Spin } from 'antd'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'

import { getProductDetail } from '../../api/product'
import { getNewsDetail } from '../../api/article'

import '../../editor.css'
import styles from './index.module.scss'

import { newsMap } from '../Home/data'

const NewsDetail = () => {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    // 获取navigate中传递的search数据
    let [searchParams, setSearchParams] = useSearchParams()
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const newsType = searchParams.get('newsType')
    let rest = type === 'product' ? [{ title: '产品详情' }] : [{ title: newsMap.get(newsType) }, { title: '文章详情' }]
    let datas = [{ title: '首页' }, ...rest]

    // console.log(newsType,newsMap.get(newsType))

    useEffect(() => {
        getDetail()
    }, [])

    const getDetail = async () => {
        try {
            if (type && id) {
                setLoading(true)
                let data = ''
                if (type === 'product') {
                    data = await getProductDetail(id)
                }
                if (type === 'news') {
                    data = await getNewsDetail(id)
                }
                const { description, createTime, publicDate, ...reset } = data
                setHtml(data.description || '')
                setData({ ...reset, createTime: (type === 'news' ? parseInt(publicDate) : Date.parse(createTime)) })
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={styles['news-detail']}>
                <div className={styles['top-left']}></div>
                <div className={styles['top-left-center']}></div>
                <div className={styles['top-right-center']}></div>
                <div className={styles['news-content']}>
                    <div className={styles['news-detail-head']}>
                        <Breadcrumb items={datas} />
                        <div className={styles['head-title']}>
                            {data.name || '-'}
                        </div>
                        <div className={styles['head-time']}>
                            {data.createTime ? moment(data.createTime).format('YYYY年MM月DD日') : '未知时间'}发布
                        </div>
                        <Divider />
                        <div className={`${styles['news-content-container']} editor-container`}>
                            <div className="w-e-text-container">
                                <div className="w-e-scroll">
                                    <div style={{ marginTop: '15px' }} dangerouslySetInnerHTML={{ __html: html }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default NewsDetail