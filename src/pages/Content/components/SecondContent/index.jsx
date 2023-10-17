import { useEffect, useRef, useState } from 'react'
import { Input, Button, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import SearchIcon from '../../../../assets/images/search.svg'
import styles from './index.module.scss'
import NewsIntro from '../../../News/NewsIntro'
import NewsSecond from '../../../News/NewsSecond'
import ThirdNews from '../../../News/ThirdNews'

const IndustryNews = ({ changeTab }) => {
    const inputDom = useRef(null)
    const firstTag = useRef(false)
    const [searchWord, setSearchWord] = useState('')
    const tabMenu = ['全部', '行业资讯', '成功案例', '解决方案']

    const handleChangeInput = (value) => {
        firstTag.current = true
        setSearchWord(value)
    }

    useEffect(() => {
        return () => {
            firstTag.current = false
        }
    }, [])

    return (
        <>
            <div className={styles['second-head']}>
                <h1 className={styles['second-title']}>您需要什么帮助</h1>
                <div className={styles['second-descrip']}>我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。</div>
                <Input
                    ref={inputDom}
                    className={styles['second-content']}
                    placeholder="这里输入关键字…"
                    prefix={<img src={SearchIcon} alt="搜索" className={styles['prefix-img']} />}
                    suffix={
                        <Button className={styles['suffix-button']} onClick={() => handleChangeInput(inputDom.current?.input.value)}>搜索</Button>
                    }
                    onPressEnter={e => handleChangeInput(e.target.value)}
                />
            </div>
            <div className={styles['content-container']}>
                {/* { } */}
                {firstTag.current ?
                    <div style={{ transform: 'translateY(-422px)' }}>
                        <ThirdNews searchWord={searchWord} type={'1'} tabType={'1'} tabMenu={tabMenu} />
                    </div> :
                    <div style={{ transform: 'translateY(-572px)' }}>
                        <NewsIntro changeTab={changeTab} />
                        <NewsSecond changeTab={changeTab} />
                    </div>}
            </div>
        </>
    )
}

export default IndustryNews