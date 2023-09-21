import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { ClockCircleOutlined, RightOutlined } from '@ant-design/icons';
import { newsData } from '../../Content/data'
import { tabMen3 } from '../../Home/data';
import { Spin } from 'antd'
import moment from 'moment'
import { getNewsList, getTypeCategory } from '../../../api/article'
import { useNavigate } from 'react-router-dom'

const FifthNews = () => {
    const [loadingData, setLoadingData] = useState({ type: '0', loading: false })
    const [newsData, setNewsData] = useState([])
    const [category, setCategory] = useState([])
    const [categoryMap, setCategoryMap] = useState(new Map())
    const navigate = useNavigate()


    useEffect(() => {
        getCategory('case')
    }, [])

    const getCategory = async (type) => {
        try {
            const data = await getTypeCategory(type) || []
            // setCategory(data)
            // data.map((item) => categoryMap.set(item.id, item))
            // setCategoryMap(categoryMap)
            getNewsData('0', data)
        } catch (err) {
            console.log(err)
        }
    }

    const getNewsData = async (type = '0', cateList = [], ...reset) => {
        if (cateList.length) {
            try {
                setLoadingData({ type, loading: true })
                const newData = cateList.map(async (item) => {
                    let list = await getNewsList(item.id, '', 'case', 1, 10000)
                    // console.log('uu')
                    return { ...item, list: list.list || [] }
                })
                const newsData = await Promise.all(newData)
                setNewsData(newsData || [])
                // const data = await getNewsList(...reset)
                setLoadingData({ type, loading: false })
            } catch (err) {
                setLoadingData({ type, loading: false })
                console.log(err)
            }
        }
    }

    return (
        <div style={{ minHeight: "500px" }}>
            <Spin spinning={loadingData.type === '0' && loadingData.loading} size="large">
                {
                    newsData?.map((itm, idx) => (
                        <div className={styles['new-container']} key={itm.id}>
                            <>
                                {
                                    itm.list?.length ? (
                                        <>
                                            <div className={styles['new-header']}>
                                                <div className={styles['new-title']}>solution</div>
                                                <div className={styles['new-action']}></div>
                                                <div className={styles['new-action']}></div>
                                            </div>
                                            <div className={styles['new-header-two']}>
                                                <div className={styles['new-title']}>{itm.name}</div>
                                            </div>
                                            <div className={styles['new-header-three']}>
                                                <div className={styles['new-title']}>{itm.description || '通过智能硬件与大数据结合，让传统农业供应链进入大数据智能时代'}</div>
                                            </div>
                                        </>
                                    ) : null
                                }
                            </>
                            <div className={styles['new-item']}>
                                {
                                    itm?.list?.map((item, index) => (
                                        <div className={styles['new-right']} title={item.name} key={item.id}>
                                            <img alt="" src={item.image} />
                                            <div className={styles['new-title']}>
                                                <div>{item.name}</div>
                                                <span className={styles['new-action']}
                                                    onClick={() => navigate(`/detail?type=news&newsType=case&id=${item.id}`)}
                                                >点击查看<RightOutlined /></span>
                                            </div>
                                            <div className={styles['new-descrip']}>{item.subName}</div>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </Spin>
        </div >
    )
}

export default FifthNews