import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import styles from './index.module.scss'
import { ClockCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import { newsData as news } from '../../Content/data'
import { tabMenu1, tabMenu2 } from '../../Home/data';
import { html2text } from 'xss';
import { useNavigate } from 'react-router-dom'
import Macy from 'macy'
import { getTypeCategory, getNewsList } from '../../../api/article'
import moment from 'moment'

const ThirdNews = ({ searchWord, type = '0', currentTab, enName = '', zhName = '' }) => {
    const [activeIndex, setActiveIndex] = useState('全部')
    const [masonry, setMasonry] = useState(null)
    const [newsData, setNewsData] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [loadingData, setLoadingData] = useState({ type: '0', isLoading: false })
    const [category, setCategory] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [categoryMap, setCategoryMap] = useState(new Map())

    const masonryRef = useRef(null)
    const navigate = useNavigate()

    let menus = [{ id: 'informatin', name: '行业资讯' }, { id: 'solution', name: '解决方案' }, { id: 'case', name: '成功案例' }]

    useEffect(() => {
        getCategory(enName)
    }, [enName])

    useEffect(() => {
        if (type === '0') {
            getNewsData('0', activeIndex === '全部' ? '' : activeIndex, searchWord, enName, 1, pageSize)
        } else {
            getNewsData('0', '', searchWord, activeIndex === '全部' ? '' : activeIndex, 1, pageSize)
        }
    }, [searchWord, activeIndex, enName])

    useLayoutEffect(() => {
        getMacy()
    }, [])

    useLayoutEffect(() => {
        masonry && masonry.runOnImageLoad(function () {
            masonry.recalculate(true);
        }, true);
    })

    const getMacy = () => {
        let masonry = new Macy({
            container: '.macy-container', // 图像列表容器
            trueOrder: false,
            waitForImages: true,
            useOwnImageLoader: false,
            debug: true,
            margin: { x: 30, y: 30 },    // 设计列与列的间距
            columns: 3,    // 设置列数
        })
        masonryRef.current = masonry
        setMasonry(masonry)
    }

    const handleClick = (index) => {
        setActiveIndex(index)
    }

    const getHTML = (data = '') => {
        let text = data
        let keywordTrim = searchWord.trim()
        if (keywordTrim) {
            if (text) {
                const words = text.split('')
                const keys = searchWord.trim().replace(/\s*/g, '').split('')
                keys.forEach(key => {
                    for (let i = 0; i < words.length; i++) {
                        if (words[i] == key) {
                            words[i] = `<span style="color: #28976F">${key}</span>`
                        }
                    }
                    text = words.join('')
                })
            }
        }
        return text
    }

    const getCategory = async (type) => {
        try {
            const data = type === '0' ? (await getTypeCategory(type)) || [] : menus
            setCategory([{ id: '全部', name: '全部' }, ...data])
            // console.log(zhName, data)
            data.map((item) => categoryMap.set(item.id, item.name))
            setCategoryMap(categoryMap)
        } catch (err) {
            console.log(err)
        }
    }

    const getNewsData = async (type = "0", ...reset) => {
        try {
            setLoadingData({ type, loading: true })
            if (type === '1') {
                setHasMore(false)
                setPageSize(pageSize + 10)
            }

            const data = await getNewsList(...reset)
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

    return (
        <div className={styles['new-container']}>
            <div className={styles['new-header']}>
                <div className={styles['new-title']}>{type === '0' ? enName : '为您找到的搜索结果'}</div>
                <div className={styles['new-action']}></div>
                <div className={styles['new-action']}></div>
            </div>
            <div className={styles['new-header-two']}>
                <div className={styles['new-title']}>{type === '0' ? zhName : '“' + searchWord + '”'}</div>
                <div className={styles['new-tab']}>
                    {
                        category.map((item, index) =>
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
                        newsData.map((item, index) => (
                            <div className={styles['new-right']} key={item.id} title={item.subName}>
                                <img alt="" src={item.image} />
                                <div className={styles['new-title']} dangerouslySetInnerHTML={{ __html: getHTML(item.name) }}></div>
                                <div className={styles['new-descrip']}>{item.subName}</div>
                                <div className={styles['new-time-right']}>
                                    <span
                                        onClick={() => navigate(`/detail?type=news&newType=${categoryMap.get(type === '0' ? item.category : activeIndex)}&id=${item.id}`)}
                                    >
                                        {categoryMap.get(type === '0' ? item.category : activeIndex) || '查看详情'}
                                        <RightOutlined />
                                    </span>
                                    <span className={styles['new-time-time']}>{item.publicDate && moment(parseInt(item.publicDate)).format('YYYY.MM.DD')}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Spin spinning={loadingData.type === '1' && loadingData.loading}>
                    <div className={styles['new-action-footer']} >
                        {hasMore && <span onClick={() => {
                            if (type === '0') {
                                getNewsData('0', activeIndex === '全部' ? '' : activeIndex, searchWord, enName, 1, (pageSize + 10))
                            } else {
                                getNewsData('1', activeIndex === '全部' ? '' : activeIndex, searchWord, enName, 1, (pageSize + 10))
                            }
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

export default ThirdNews