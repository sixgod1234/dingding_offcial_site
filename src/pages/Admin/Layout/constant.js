import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Form, Badge, Descriptions, Avatar, List, Space } from 'antd'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const data = Array.from({ length: 5 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


export const menuData = [
    {
        key: '/admin/home-detail',
        icon: <UserOutlined />,
        label: <Link to='/admin/home-detail'>基本配置</Link>,
    },
    {
        key: '/admin/product-manage',
        icon: <VideoCameraOutlined />,
        label: <Link to='/admin/product-manage'>产品管理</Link>,
    },
    {
        key: '/admin/news-manage',
        icon: <UploadOutlined />,
        label: <Link to='/admin/article-manage'>文章管理</Link>,
    },
    {
        key: "/admin/contact-user",
        icon: <UserOutlined />,
        label: <Link to="/admin/contact-user">联系用户</Link>,
    },
]

export const items = [
    {
        key: 'headZnTitle',
        label: '轮播图区域中文名',
        children: '町町使一切成为可能物联网领军',
        span: 4,
    },
    {
        key: 'headEnTitle',
        label: '轮播图区域英文名',
        children: 'Sience xxxx womenshishui',
        span: 4,
    },
    {
        key: 'headDescription',
        label: '轮播图区域描述',
        children: '辅助信息的文字示例文本，天空万里无云，呈深蓝色。 我们面前的景象确实是崇高的。',
        span: 4,
    },
    {
        key: 'carouselImgs',
        label: '轮播图',
        children: [],
        span: 4,
    },
    {
        key: 'dingProfile',
        label: '公司介绍',
        children: '町町啊啊啊，最厉害的町町啊啊啊',
        span: 4,
    },
    {
        key: 'dingDescription',
        label: '公司描述',
        children: '通过智能硬件与大数据结合，让传统餐饮供应链进入大数据智能时代',
        span: 4,
    },
    {
        key: 'dingProfileImgs',
        label: '公司介绍图',
        children: [],
        span: 4,
    },
    {
        key: 'case',
        label: '项目案例数',
        children: 127,
        span: 1,
    },
    {
        key: 'area',
        label: '合作地区数',
        children: '60',
        span: 1,
    },
    {
        key: 'supplier',
        label: '合作供应商数',
        children: '3000',
        span: 1,
    },
    {
        key: 'customer',
        label: '运营客户数',
        children: '425',
        span: 1,
    },
    {
        key: 'productCase',
        label: '公司优秀产品案例',
        span: 4,
        children: (
            <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        ),
    },
    {
        key: 'coreAdvantages',
        label: '核心优势',
        span: 4,
        children: (<List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                >
                    {item.content}
                </List.Item>
            )}
        />),
    },
    {
        key: 'splitTitle',
        label: '分割标题',
        span: 4,
        children: ('分割标题'),
    },
    {
        key: 'splitContent',
        label: '分割内容',
        span: 4,
        children: ('分割内容分割内容分割内容分割内容分割内容分割内容'),
    },
    {
        key: 'teamIntroduction',
        label: '团队介绍',
        span: 4,
        children: ('团队介绍团队介绍'),
    },
    {
        key: 'teamStyle',
        label: '团队风采',
        span: 4,
        children: (
            <List
                itemLayout="vertical"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        )
    },
    {
        key: 'companyIntroduction',
        label: '公司介绍',
        span: 2,
        children: ('公司介绍公司介绍'),
    },
    {
        key: 'companyDescription',
        label: '公司简介',
        span: 2,
        children: ('公司简介'),
    },
    {
        key: 'companyStyle',
        label: '公司风采',
        span: 4,
        children: ([])
    },
    {
        key: 'honorWall',
        label: '荣誉墙',
        span: 4,
        children: ([])
    },
    {
        key: 'address',
        label: '公司地址',
        span: 4,
        children: ([])
    },
    {
        key: 'zhAddress',
        label: '公司详细地址',
        span: 4,
        children: ('河北省北京市xxxx'),
    },
    {
        key: 'phone',
        label: '联系电话',
        span: 4,
        children: ('13677777777'),
    },
    {
        key: 'contactUs',
        label: '底部联系我们文案',
        span: 4,
        children: ([])
    },
];