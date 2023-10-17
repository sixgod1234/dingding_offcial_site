import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { ClockCircleOutlined, RightOutlined } from '@ant-design/icons';
import { newsData } from '../../Content/data'
import { tabMen3 } from '../../Home/data';
import { Spin } from 'antd'
import Macy from 'macy'
import moment from 'moment'
import { getNewsList, getTypeCategory } from '../../../api/article'
import { useNavigate } from 'react-router-dom';

const FourthNews = () => {
    const [activeIndex, setActiveIndex] = useState('')
    // const [keyword, setKeyword] = useState('农业相关政策')
    const [masonry, setMasonry] = useState(null)
    const [loadingData, setLoadingData] = useState({ type: '0', loading: false })
    const [newsData, setNewsData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [hasMore, setHasMore] = useState(false)
    const [category, setCategory] = useState([])
    const [categoryMap, setCategoryMap] = useState(new Map())

    const navigate = useNavigate()

    useEffect(() => {
        // getMacy()
        getCategory('solution')
    }, [])

    // const getMacy = () => {
    //     if (masonry) {
    //         masonry.reInit()
    //     } else {
    //         let masonry = new Macy({
    //             container: '.macy-container', // 图像列表容器
    //             trueOrder: false,
    //             waitForImages: false,
    //             useOwnImageLoader: false,
    //             debug: true,
    //             margin: { x: 30, y: 30 },    // 设计列与列的间距
    //             columns: 3,    // 设置列数
    //         })
    //         setMasonry(masonry)
    //     }
    // }


    // useLayoutEffect(() => {
    //     masonry && masonry.runOnImageLoad(function () {
    //         masonry.recalculate(true);
    //     }, true);
    // })

    const handleClick = (index) => {
        setActiveIndex(index)
        getNewsData('0', index || activeIndex, '', 'solution', 1, pageSize)
    }

    const getCategory = async (type) => {
        try {
            const data = await getTypeCategory(type) || []
            setCategory(data)
            setActiveIndex(data[0]?.id)
            data.map((item) => categoryMap.set(item.id, item.name))
            setCategoryMap(categoryMap)
            getNewsData('0', data[0]?.id || '', '', 'solution', 1, pageSize)
        } catch (err) {
            console.log(err)
        }
    }

    const getNewsData = async (type = '0', category, ...reset) => {
        try {
            setLoadingData({ type, loading: true })
            if (type === '1') {
                setHasMore(false)
                setPageSize(pageSize + 10)
            }

            const data = await getNewsList(category, ...reset)
            setNewsData(data.list || [])
            // console.log(newsData)
            setHasMore(false)
            if (data.total && data.total > (type === '1' ? (pageSize + 10) : pageSize)) {
                setHasMore(true)
            }
            setLoadingData({ type, loading: false })
            masonry && masonry.reInit()
        } catch (err) {
            setHasMore(false)
            setLoadingData({ type, loading: false })
            console.log(err)
        }
    }

    // const getHTML = (data = '') => {
    //     let text = data
    //     let keywordTrim = keyword.trim()
    //     if (keywordTrim) {
    //         let newData = (new Fuse([data], { findAllMatches: true, keys: ['content'], threshold: 1 })).search(keywordTrim).map(e => e.item)[0]
    //         // console.log(newData, data)
    //         if (newData) {
    //             const words = newData.split('')
    //             const keys = keyword.trim().replace(/\s*/g, '').split('')
    //             keys.forEach(key => {
    //                 for (let i = 0; i < words.length; i++) {
    //                     if (words[i] == key) {
    //                         words[i] = `<span style="color: #28976F">${key}</span>`
    //                     }
    //                 }
    //                 text = words.join('')
    //             })
    //         }
    //     }
    //     return text
    // }

    return (

        <div className={styles['new-container']}>
            <div className={styles['new-header']}>
                <h1 className={styles['new-title']}>solution</h1>
                <div className={styles['new-action']}></div>
                <div className={styles['new-action']}></div>
            </div>
            <div className={styles['new-header-two']}>
                <h1 className={styles['new-title']}>解决方案</h1>
                {/* <div className={styles['new-action']}></div> */}
                <div className={styles['new-tab']}>
                    {
                        category?.map((item, index) =>
                            <span
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`${styles['tab-item']} ${styles[activeIndex === item.id ? 'active-tab' : '']}`}>
                                {item.name}
                            </span>
                        )
                    }
                </div>

            </div>
            <Spin spinning={loadingData.type === '0' && loadingData.loading} size="large">
                <div className={`${styles['new-item']} macy-container`}>
                    {
                        newsData?.map((item, index) => (
                            <div className={styles['new-right']} title={item.name} key={item.id}>
                                <img alt={item.name} src={newsData[index].image} />
                                <h1 className={styles['new-title']}>
                                    {item.name}
                                </h1>
                                <div className={styles['new-descrip']}>{item.subName}</div>
                                <div className={styles['new-time-right']}>
                                    <span
                                        onClick={() => navigate(`/detail?type=news&newsType=solution&id=${item.id}`)}
                                    >{categoryMap.get(item.category) || '新闻详情'}<RightOutlined /></span>
                                    <span className={styles['new-time-time']}>{item.publicDate && moment(parseInt(item.publicDate)).format('YYYY.MM.DD')}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Spin spinning={loadingData.type === '1' && loadingData.loading}>
                    <div className={styles['new-action-footer']} >
                        {hasMore && <span onClick={() => {
                            getNewsData('1', activeIndex || '', '', 'solution', 1, (pageSize + 10));
                            setHasMore(false)
                        }}>
                            MORE
                        </span>}
                    </div>
                </Spin>
            </Spin>
        </div >
    )
}

export default FourthNews