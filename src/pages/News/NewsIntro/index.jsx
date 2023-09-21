import styles from './index.module.scss'
import { ClockCircleOutlined } from '@ant-design/icons';
import { newsData } from '../../Content/data'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

// 行业资讯
const NewsIntro = ({ changeTab }) => {
    const navigate = useNavigate()
    const informationList = JSON.parse(localStorage.getItem('information') || '[]')

    return (
        <div className={styles['new-container']}>
            <div className={styles['new-header']}>
                <div className={styles['new-title']}>information</div>
                <div className={styles['new-action']}></div>
                <div className={styles['new-action']}></div>
            </div>
            <div className={styles['new-header-two']}>
                <div className={styles['new-title']}>行业资讯</div>
                <div></div>
                <div className={styles['new-action']} onClick={() => changeTab(7)}>
                    <span>MORE</span>
                </div>
            </div>
            <div className={styles['new-item']}>
                {informationList?.[0] && <div className={styles['new-left']} onClick={() => navigate(`/detail?type=news&newsType=information&id=${informationList[0].id}`)}>
                    <img alt="" src={informationList[0].image} />
                    <div className={styles['new-time']}>
                        <span className={styles['new-time-left']}>
                            <ClockCircleOutlined />
                            <span>{informationList[0].publicDate && moment(Date.parse(informationList[0].publicDate) || parseInt(informationList[0].publicDate)).format('YYYY.MM.DD')}</span>
                        </span>
                        <a>点击查看</a>
                    </div>
                    <div className={styles['new-title']}>{informationList[0].name}</div>
                    <div className={styles['new-descrip']}>{informationList[0].subName}</div>
                </div>}

                <div>
                    {informationList?.[1] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=information&id=${informationList[1].id}`)}>
                        <img alt="" src={informationList[1].image} />
                        <div className={styles['new-title']}>{informationList[1].name}</div>
                        <div className={styles['new-descrip']}>{informationList[1].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{informationList[1].publicDate && moment(Date.parse(informationList[1].publicDate) || parseInt(informationList[1].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                    {informationList?.[3] && <div className={styles['new-right']} style={{ marginTop: "30px" }} onClick={() => navigate(`/detail?type=news&newsType=information&id=${informationList[3].id}`)}>
                        <img alt="" src={informationList[3].image} />
                        <div className={styles['new-title']}>{informationList[3].name}</div>
                        <div className={styles['new-descrip']}>{informationList[3].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{informationList[3].publicDate && moment(Date.parse(informationList[3].publicDate) || parseInt(informationList[3].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                </div>
                <div>
                    {informationList?.[2] && <div className={styles['new-right']} onClick={() => navigate(`/detail?type=news&newsType=information&id=${informationList[2].id}`)}>
                        <img alt="" src={informationList[2].image} />
                        <div className={styles['new-title']}>{informationList[2].name}</div>
                        <div className={styles['new-descrip']}>{informationList[2].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{informationList[2].publicDate && moment(Date.parse(informationList[2].publicDate) || parseInt(informationList[2].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                    {informationList?.[4] && <div className={styles['new-right']} style={{ marginTop: "30px" }} onClick={() => navigate(`/detail?type=news&newsType=information&id=${informationList[4].id}`)}>
                        <img alt="" src={informationList[4].image} />
                        <div className={styles['new-title']}>{informationList[4].name}</div>
                        <div className={styles['new-descrip']}>{informationList[4].subName}</div>
                        <div className={styles['new-time-right']}>
                            <ClockCircleOutlined />
                            <span>{informationList[4].publicDate && moment(Date.parse(informationList[4].publicDate) || parseInt(informationList[4].publicDate)).format('YYYY.MM.DD')}</span>
                        </div>
                    </div>}
                </div>
            </div>
        </div >
    )
}

export default NewsIntro