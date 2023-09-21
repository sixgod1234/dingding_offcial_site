import { useState, useRef, useEffect } from 'react'
import { headTabData } from './constant'
import Header from '../Header'
import Footer from '../Footer'
import Content from '../Content'
import styles from './index.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
    getHomeList,
    getHome,
    addHome,
    editHome,
    addContent,
    editContent,
    getTypeContent
} from '../../api/home'
import { getProductAll, getProductTypeList, addProductList } from '../../api/product'
import { getNewsList } from '../../api/article'
import { Spin, message } from 'antd'

const Home = () => {
    const domRef = useRef(null)
    const navDom = useRef(null)
    const headerDom = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    // 0:首页, 1:产品中心,2:解决方案 ,3:成功案例,4:联系我们,5:关于我们,6:搜索,7:搜索行业资讯/最新文章
    const [currentTab, setCurrentTab] = useState(0)
    const [isFixed, setIsFixed] = useState(false)
    const [loading, setLoading] = useState(false)
    const isDetail = location.pathname === '/detail'

    // 滚动header显示其他样式
    useEffect(() => {
        getDetail()
        getAllProduct()
        getNews()

        const dom = domRef?.current
        let isFixed = false
        const handleScroll = () => {
            let top = headerDom.current?.getBoundingClientRect().top
            if (top < 0 && !isFixed) {
                isFixed = true
                setIsFixed(true)
            }
            if (top === 0 || top > 0 && isFixed) {
                isFixed = false
                setIsFixed(false)
            }
        };

        dom && dom.addEventListener('scroll', handleScroll);
        return () => {
            dom && dom.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 每次切换tab滚动到顶部
    useEffect(() => {
        domRef?.current.scrollTo({ top: 0 });
    }, [currentTab, isDetail])

    const handleClick = (index) => {
        isDetail && navigate('/')
        setCurrentTab(index)
    }

    // 行业资讯/默认五条
    const getNews = async () => {
        try {
            const data = await getNewsList('', '', 'information', 1, 5,)
            localStorage.setItem('information', JSON.stringify(data.list || []))
        } catch (er) {
            console.log(er)
        }
    }

    const getDetail = async () => {
        try {
            setLoading(true)
            // 1.获取列表的最新元素
            const data7 = await getHomeList() || { list: [] }
            let len = data7.list.length - 1
            if (len < 0) {
                setLoading(false)
                message.warning('未获取到首页数据')
                return
            }
            // 2.获取头部数据
            const data8 = await getHome(data7.list[len]?.id) || {}
            const { name: headZnTitle, enName: headEnTitle, description: headDescription, images: images1 } = data8
            const value1 = {
                headZnTitle,
                headEnTitle,
                headDescription,
                carouselImgs: images1?.split(';').map((item) => ({ url: item })),
            }

            // 3.获取项目
            const data1 = await getTypeContent('profile') || []
            const { name: name2, description: description2, images: images2, remark: remark2 } = data1[data1.length - 1] || {}
            const value2 = {
                dingProfile: name2,
                dingDescription: description2,
                dingProfileImgs: images2?.split(';').map((item) => ({ url: item })),
                ...(JSON.parse(remark2 || '{}') || {})
            }

            // 4.获取案例
            const data2 = await getTypeContent('about') || []
            const value3 = handleChangeDataList(data2[data2.length - 1] || {}, 'productCase')

            // 5.团队风采
            const data3 = await getTypeContent('advantage') || []
            const value4 = handleChangeDataList(data3[data3.length - 1] || {}, 'coreAdvantages')

            const data4 = await getTypeContent('employee') || []
            const value5 = handleChangeDataList(data4[data4.length - 1] || {}, 'teamStyle', 'teamIntroduction')

            const data5 = await getTypeContent('aboutDetail') || []
            const { name: companyIntroduction, description: companyDescription, images: images6 } = data5[data5.length - 1] || {}
            const value6 = { companyIntroduction, companyDescription, companyStyle: images6?.split(';').map((item) => ({ url: item })) }

            const data6 = await getTypeContent('honor') || []
            const { images: images7 } = data6[data6.length - 1] || {}
            const value7 = { honorWall: images7?.split(';').map((item) => ({ url: item })) }

            const values = { ...value1, ...value2, ...value3, ...value4, ...value5, ...value6, ...value7 }
            // console.log(values)
            localStorage.setItem('homeData', JSON.stringify(values))
            // form.setFieldsValue(values)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleChangeDataList = (data = {}, formName, remmarks) => {
        const { name, description, images, remark } = data
        let names = name?.split(';')
        let descriptions = description?.split(';')
        let imagess = images?.split(';')
        const value = {
            [formName]: names.map((item, index) => ({ title: item, content: descriptions[index], imgUrl: [{ url: imagess[index] }] })),
            ...(remmarks ? { [remmarks]: remark } : {})
        }
        return value
    }

    const getAllProduct = async () => {
        try {
            const data = await getProductAll()
            const dataType = await getProductTypeList(100)
            localStorage.setItem('productAll', JSON.stringify(data))
            localStorage.setItem('productAllType', JSON.stringify(dataType.list || []))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={`${styles['home-container']} ${styles[isDetail ? 'detail-back' : '']}`} ref={domRef}>
                <div className={`${styles['nav-contianer']} ${styles[isFixed || isDetail ? 'nav-contian-fixed' : '']}`} ref={navDom}>
                    <div className={styles['header-title']}></div>
                    <ul className={styles['header-tab']}>
                        {
                            headTabData.map((item, index) => (
                                <li key={index}
                                    onClick={() => handleClick(index)}
                                    className={styles[currentTab === index && currentTab < 6 ? 'li-active' : '']}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {isDetail ?
                    <Outlet />
                    : <>
                        <div className={styles['header-container']} ref={headerDom}>
                            <Header currentTab={currentTab} />
                        </div>
                        <Content currentTab={currentTab} changeTab={handleClick} />
                    </>}
                <Footer changeTab={handleClick} />
            </div >
        </Spin>
    )
}

export default Home