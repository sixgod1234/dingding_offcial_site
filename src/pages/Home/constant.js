import { Dropdown, Button } from 'antd';
import styles from './index.module.scss'
export const headReSource = [
    {
        label: '首页',
        path: '/home',
        state: { currentTab: 0 },
        type: 'dropdown',
        children: []
    },
    {
        label: '产品中心',
        path: '/product',
        state: { currentTab: 1 },
        type: 'dropdown',
        children: []
    },
    {
        label: '解决方案',
        path: '/resolution',
        state: { currentTab: 2 },
        type: 'dropdown',
        children: []
    },
    {
        label: '成功案例',
        path: '/successed-case',
        state: { currentTab: 3 },
        type: 'dropdown',
        children: [
            // {
            //     label: '联系我们',
            //     key: "7"
            // },
            // {
            //     label: '成功的水阁村',
            //     key: "8"
            // },
            // {
            //     label: '成功的水阁村',
            //     key: "9"
            // },
            // {
            //     label: '成功的水阁村',
            //     key: "10"
            // },
        ],
    },
    {
        label: '联系我们',
        path: '/contact-us',
        state: { currentTab: 4 },
        type: 'dropdown',
        children: []
    },
    {
        label: '关于我们',
        path: '/about-us',
        state: { currentTab: 5 },
        type: 'dropdown',
        children: []
    },
    {
        label: '搜索',
        path: '/search',
        state: { currentTab: 6 },
        type: 'button',
        children: []
    },
]

export const headTabData = headReSource.map((item) => {
    if (item.type === 'dropdown' && item.children.length) {
        return ({
            ...item,
            element: (
                <Dropdown key={item.path} menu={{ items: item.children }} arrow={{ pointAtCenter: true }}>
                    <div>{item.label}</div>
                </Dropdown>
            )
        })
    }
    if (item.type === 'button') {
        return ({
            ...item,
            element:
                <Button key={item.path} className={styles['header-button']}>
                    {item.label}
                </Button>
        })
    }
    return item
}
)

const pathTab = [
    {
        path: '/home',
        tab: 0,
    },
    {
        path: '/product',
        tab: 1,
    },
    {
        path: '/resolution',
        tab: 2,
    },
    {
        path: '/successed-case',
        tab: 3,
    },
    {
        path: '/contact-us',
        tab: 4,
    },
    {
        path: '/about-us',
        tab: 5,
    },
    {
        path: '/search',
        tab: 6,
    },
    {
        path: '/information',
        tab: 7,
    },
    {
        path: '/news',
        tab: 8,
    },
]

export const getUrl = (pathname) => {
    return pathTab.filter((item) => item.path === pathname)[0]?.tab
}