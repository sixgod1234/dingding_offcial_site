import styles from './index.module.scss'
import { ClockCircleOutlined } from '@ant-design/icons';
// import { dataSource } from '../../Content/data'
import { useEffect, useState } from 'react';
import { getNewsList } from '../../../api/article'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd'

const NewsSecond = ({ changeTab }) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getNews()
    }, [])

    // 行业资讯/默认五条
    const getNews = async () => {
        try {
            setLoading(true)
            const data = await getNewsList('', '', '', 1, 5,) || []
            // console.log(data)
            setDataSource(data.list)
            setLoading(false)
        } catch (er) {
            setLoading(false)
            console.log(er)
        }
    }

    return (
        <Spin spinning={loading}>
            <div className={styles['new-container']}>
                <div className={styles['new-header']}>
                    <div className={styles['new-title']}>latest articles</div>
                    <div className={styles['new-action']}></div>
                    <div className={styles['new-action']}></div>
                </div>
                <div className={styles['new-header-two']}>
                    <div className={styles['new-title']}>最新文章</div>
                    <div></div>
                    <div className={styles['new-action']} onClick={() => changeTab(8)}>
                        <span>MORE</span>
                    </div>
                </div>
                <div className={styles['new-item']}>
                    {dataSource[0] && <div className={styles['new-left']} onClick={() => navigate(`/detail?type=news&newsType=''&id=${dataSource[0].id}`)}>
                        <img alt="" src={dataSource[0].image} />
                        <div className={styles['new-time']}>{moment(Date.parse(dataSource[0].publicDate) || parseInt(dataSource[0].publicDate)).format('YYYY.MM.DD')}</div>
                        <div className={styles['new-title']}>{dataSource[0].name}喝啥酒回复艰苦户籍科</div>
                        <div className={styles['new-descrip']}>{dataSource[0].subName}</div>
                    </div>}

                    {dataSource[1] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=''&id=${dataSource[1].id}`)}>
                        <img alt="" src={dataSource[1].image} />
                        <div className={styles['new-title']}>{dataSource[1].name}</div>
                        <div className={styles['new-descrip']}>{dataSource[1].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{moment(Date.parse(dataSource[1].publicDate) || parseInt(dataSource[1].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                </div>

                <div className={styles['foot-contain']}>
                    {dataSource[2] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=''&id=${dataSource[2].id}`)}>
                        <img alt="" src={dataSource[2].image} />
                        <div className={styles['new-title']}>{dataSource[2].name}</div>
                        <div className={styles['new-descrip']}>{dataSource[2].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{moment(Date.parse(dataSource[2].publicDate) || parseInt(dataSource[2].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                    {dataSource[3] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=''&id=${dataSource[3].id}`)}>
                        <img alt="" src={dataSource[3].image} />
                        <div className={styles['new-title']}>{dataSource[3].name}</div>
                        <div className={styles['new-descrip']}>{dataSource[3].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{moment(Date.parse(dataSource[3].publicDate) || parseInt(dataSource[3].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                    {dataSource[4] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=''&id=${dataSource[4].id}`)}>
                        <img alt="" src={dataSource[4].image} />
                        <div className={styles['new-title']}>{dataSource[4].name}</div>
                        <div className={styles['new-descrip']}>{dataSource[4].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{moment(Date.parse(dataSource[4].publicDate) || parseInt(dataSource[4].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                </div>
            </div >
        </Spin>
    )
}

export default NewsSecond