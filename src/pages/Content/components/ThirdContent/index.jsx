import { useEffect, useState } from 'react'
import { Input, Button, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import SearchIcon from '../../../../assets/images/search.svg'
import { hotTag } from '../../../Home/data';
import styles from './index.module.scss'
import ThirdNews from '../../../News/ThirdNews'
const ThirdContent = ({ currentTab }) => {
    const tabMenu1 = ['全部', '公司动态', '行业新闻']
    const tabMenu2 = ['全部', '行业资讯', '成功案例', '解决方案']
    const [searchWord, setSearchWord] = useState('')

    const { Item } = Form
    const [form] = Form.useForm()

    const onFinish = (values) => {
        const { searchWord = '' } = values
        setSearchWord(searchWord)
    }

    return (
        <>
            <div className={styles['second-head']}>
                <div className={styles['second-title']}>文案文案资讯中心</div>
                <Form onFinish={onFinish} className={styles['second-content']} form={form}>
                    <Item name="searchWord" noStyle style={{ width: '100%', display: "flex", justifyConten: 'center' }}>
                        <Input
                            style={{ maxWidth: '1000px' }}
                            placeholder="这里输入关键字…"
                            prefix={<img src={SearchIcon} alt="搜索" className={styles['prefix-img']} />}
                            suffix={
                                <Button className={styles['suffix-button']} htmlType="submit">搜索</Button>
                            }
                        />
                    </Item>
                </Form>
                <div className={styles['second-action-tab']}>
                    <span>热门标签：</span>
                    {hotTag.map((item, index) => (
                        <div className={styles['tab-button']} key={index} onClick={() => form.setFieldsValue({ searchWord: item })}>
                            {item}
                        </div>))}
                </div>
            </div>
            <div className={styles['content-container']}>
                <ThirdNews
                    searchWord={searchWord}
                    zhName={currentTab === 7 ? '行业资讯' : '最新文章'}
                    enName={currentTab === 7 ? 'information' : 'laste news'}
                    tabMenu={currentTab}
                    type={'0'}
                    tabType={currentTab === 7 ? '0' : '1'}
                />
            </div>
        </>
    )
}

export default ThirdContent