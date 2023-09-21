import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, List, Descriptions, Button, Spin, message } from 'antd'
import styles from './index.module.scss'
import { items } from '../Layout/constant'
import { mockHomeData } from './mockData'
import {
    getHomeList,
    getHome,
    addHome,
    editHome,
    addContent,
    editContent,
    getTypeContent
} from '../../../api/home'

const { Item } = Descriptions
const HomeDetail = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('edit');
    const [homeData, setHomeData] = useState({})
    const [idMap, setIdMap] = useState((new Map()))

    useEffect(() => {
        getDetail()
    }, [])

    const handleEdit = () => {
        navigate('/admin/home-edit', { state: { type, homeData, idMap } })
    }

    const getDetail = async () => {
        try {
            setLoading(true)
            // 1.获取列表的最新元素
            const data7 = await getHomeList() || { list: [] }
            let len = data7.list.length - 1
            if (len < 0) {
                setType('add')
                setLoading(false)
                setHomeData({})
                message.warning('未获取到头部数据')
                return
            }
            // 2.获取头部数据
            const data8 = await getHome(data7.list[len]?.id) || {}
            idMap.set('home', data7.list[len]?.id)
            const { name: headZnTitle, enName: headEnTitle, description: headDescription, images: images1 } = data8
            const value1 = {
                headZnTitle,
                headEnTitle,
                headDescription,
                carouselImgs: images1?.split(';').map((item) => ({ url: item })),
            }

            // 3.获取项目
            const data1 = await getTypeContent('profile') || []
            idMap.set('profile', data1[data1.length - 1].id)
            const { name: name2, description: description2, images: images2, remark: remark2 } = data1[data1.length - 1] || {}
            const value2 = {
                dingProfile: name2,
                dingDescription: description2,
                dingProfileImgs: images2?.split(';').map((item) => ({ url: item })),
                ...(JSON.parse(remark2 || '{}') || {})
            }

            // 4.获取案例
            const data2 = await getTypeContent('about') || []
            idMap.set('about', data2[data2.length - 1].id)
            const value3 = handleChangeDataList(data2[data2.length - 1] || {}, 'productCase')

            // 5.团队风采
            const data3 = await getTypeContent('advantage') || []
            idMap.set('advantage', data3[data3.length - 1].id)
            const value4 = handleChangeDataList(data3[data3.length - 1] || {}, 'coreAdvantages')

            const data4 = await getTypeContent('employee') || []
            idMap.set('employee', data4[data4.length - 1].id)
            const value5 = handleChangeDataList(data4[data4.length - 1] || {}, 'teamStyle', 'teamIntroduction')

            const data5 = await getTypeContent('aboutDetail') || []
            idMap.set('aboutDetail', data5[data5.length - 1].id)
            const { name: companyIntroduction, description: companyDescription, images: images6 } = data5[data5.length - 1] || {}
            const value6 = { companyIntroduction, companyDescription, companyStyle: images6?.split(';').map((item) => ({ url: item })) }

            const data6 = await getTypeContent('honor') || []
            idMap.set('honor', data6[data6.length - 1].id)
            const { images: images7 } = data6[data6.length - 1] || {}
            const value7 = { honorWall: images7?.split(';').map((item) => ({ url: item })) }

            const values = { ...value1, ...value2, ...value3, ...value4, ...value5, ...value6, ...value7 }
            console.log(values)
            setHomeData(values)
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

    const getChildren = (key) => {
        if (key === 'carouselImgs' || key === 'honorWall' || key === 'dingProfileImgs' || key === 'companyStyle') {
            return (
                <Space size={20}>
                    {homeData?.[key]?.map((item, index) => <img key={index} className={styles['img-container']} src={item.url} alt="" />)}
                </Space>
            )
        }
        if (key === 'productCase' || key === 'teamStyle' || key === 'coreAdvantages') {
            return (<List
                itemLayout="vertical"
                dataSource={homeData?.[key]}
                renderItem={(item) => (
                    <List.Item
                        key={item.title || item.name}
                        extra={
                            <img
                                width={100}
                                height={100}
                                alt="logo"
                                src={item.imgUrl?.[0]?.url}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title || item.name}</a>}
                        />
                        {item.content}
                    </List.Item>
                )}
            />)
        }
        if (key === 'address') {
            return (
                <Descriptions column={2}>
                    <Descriptions.Item label="经度">{homeData?.[key]?.[0]}</Descriptions.Item>
                    <Descriptions.Item label="纬度">{homeData?.[key]?.[1]}</Descriptions.Item>
                </Descriptions >)
        }
        return <span>{homeData?.[key]}</span>
    }

    return (
        <Spin spinning={loading}>
            <div className={styles['container']}>
                <Descriptions title={
                    <div className={styles['card-action']}>
                        <span>基本配置信息</span>
                        <Button type="primary" onClick={handleEdit}>{type === 'edit' ? '编辑' : '新增'}</Button>
                    </div>}
                    bordered
                    column={4}
                >
                    {items.map((item) => (
                        <Item label={item.label} span={item.span}>
                            {getChildren(item.key)}
                        </Item>
                    ))}
                </Descriptions>
            </div>
        </Spin>
    )
}

export default HomeDetail