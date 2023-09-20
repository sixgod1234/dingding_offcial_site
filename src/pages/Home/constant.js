import { Dropdown, Button } from 'antd';
import styles from './index.module.scss'
export const headReSource = [
    {
        label: '首页',
        value: '0',
        type: 'dropdown',
        children: []
    },
    {
        label: '产品中心',
        value: '1',
        type: 'dropdown',
        children: []
    },
    {
        label: '解决方案',
        value: '2',
        type: 'dropdown',
        children: []
    },
    {
        label: '成功案例',
        value: '3',
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
        value: '4',
        type: 'dropdown',
        children: []
    },
    {
        label: '关于我们',
        value: '5',
        type: 'dropdown',
        children: []
    },
    {
        label: '搜索',
        value: '6',
        type: 'button',
        children: []
    },
]

export const headTabData = headReSource.map((item) => {
    if (item.type === 'dropdown' && item.children.length) {
        return (
            <Dropdown key={item.value} menu={{ items: item.children }} arrow={{ pointAtCenter: true }}>
                <div>{item.label}</div>
            </Dropdown>
        )
    }
    if (item.type === 'button') {
        return (
            <Button key={item.value} className={styles['header-button']}>
                {item.label}
            </Button>
        )
    }
    return item.label
}
)