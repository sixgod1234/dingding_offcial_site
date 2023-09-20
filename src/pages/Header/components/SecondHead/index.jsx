import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import SearchIcon from '../../../../assets/images/search.svg'
const SecondHead = () => {

    return (
        <div className={styles['second-head']}>
            <div className={styles['second-title']}>您需要什么帮助</div>
            <div className={styles['second-descrip']}>我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。</div>
            <Input
                className={styles['second-content']}
                placeholder="这里输入关键字…"
                prefix={<img src={SearchIcon} alt="" className={styles['prefix-img']} />}
                suffix={
                    <Button className={styles['suffix-button']}>搜索</Button>
                }
            />
        </div>
    )
}

export default SecondHead