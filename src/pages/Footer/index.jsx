import styles from './index.module.scss'
import { footerData } from '../Home/data'
import OrcCode from '../../assets/images/orc-code.png'
import Phone from '../../assets/images/phone.svg'
import Internet from '../../assets/images/internet.svg'
import Position from '../../assets/images/position.svg'
import Email from '../../assets/images/email.svg'
import Social from '../../assets/images/social.svg'
import { localParse } from '../../util'
import { useNavigate } from 'react-router-dom'

const Footer = ({ changeTab }) => {
    const headeData = localParse('homeData') || {}
    const productAllType = () => {
        let arr = localParse('productAllType') || [];
        // console.log(localParse('productAllType'))
        if (arr.length) {
            let newArr = arr.slice(0, 4).map((item) => ({ ...item, path: '/product', href: item.enName, currentTab: 1 }))
            return [{ path: '', href: '', currentTab: 1, name: '产品中心' }, ...newArr]
        } else {
            return footerData[1]
        }
    }

    const { contactUs } = headeData
    const navigate = useNavigate()

    return (
        <div className={styles['footer-container']}>
            <div className={styles['footer-action']}>
                <h1 className={styles['footer-left']}>
                    {contactUs || '选择我们吧文案文案选择我们吧文案文案选择我们吧文案文'}
                </h1>
                <div className={styles['footer-right']} onClick={() => changeTab?.({ path: '/contact-us', state: { currentTab: 4 } })}>
                    联系我们
                </div>
            </div>

            <div className={styles['footer-content']}>
                <div className={styles['footer-left']}>
                    <div className={styles['footer-one']}>
                        <img src={OrcCode} alt="微信扫码关注" />
                        <div>微信扫码关注</div>
                        <div>资讯产品专家</div>
                    </div>
                    <div className={styles['footer-one']}>
                        <img src={OrcCode} alt="抖音扫码关注" />
                        <div>抖音扫码关注</div>
                        <div>在线讲解</div>
                    </div>
                    <div className={styles['footer-three']}>
                        <div><img alt="联系电话" src={Phone} />400-966-7200</div>
                        <div><img alt="町町官网地址" src={Internet} />www.dingdingnb.com</div>
                        <div><img alt="町町地址" src={Position} />杭州市余杭区町町路町町町楼321号</div>
                        <div><img alt="联系邮箱" src={Email} />DINGDING@gmail.com</div>
                    </div>
                </div>
                <div className={styles['footer-right']}>
                    {
                        footerData.map((itm, idx) => (
                            <div className={styles['right-item']}>
                                {
                                    (idx === 1 ? productAllType() : itm).map((item, index) => (
                                        <div key={index} title={item.name} onClick={() => {
                                            item.path && changeTab?.({ path: item.path + '#' + item.href, state: { currentTab: item.currentTab } })
                                        }}>
                                            {item.name}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles['footer-identify']}>
                <span>Copyright © 2020 Laaqiq. All Rights Reserved.</span>
                <span className={styles['footer-icp']} onClick={() => window.open("https://beian.miit.gov.cn/#/Integrated/index", '_blank')}>浙ICP备2023003188号</span>
                <img src={Social} alt="社交" />
            </div>
        </div>
    )
}

export default Footer
