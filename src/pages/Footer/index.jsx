import styles from './index.module.scss'
import { footerData } from '../Home/data'
import OrcCode from '../../assets/images/orc-code.png'
import Phone from '../../assets/images/phone.svg'
import Internet from '../../assets/images/internet.svg'
import Position from '../../assets/images/position.svg'
import Email from '../../assets/images/email.svg'
import Social from '../../assets/images/social.svg'

const Footer = ({ changeTab }) => {
    const headeData = JSON.parse(localStorage.getItem('homeData') || '{}') || '{}'
    const { contactUs } = headeData

    return (
        <div className={styles['footer-container']}>
            <div className={styles['footer-action']}>
                <div className={styles['footer-left']}>
                    {contactUs || '选择我们吧文案文案选择我们吧文案文案选择我们吧文案文'}
                </div>
                <div className={styles['footer-right']} onClick={() => changeTab?.(4)}>
                    联系我们
                </div>
            </div>

            <div className={styles['footer-content']}>
                <div className={styles['footer-left']}>
                    <div className={styles['footer-one']}>
                        <img src={OrcCode} />
                        <div>微信扫码关注</div>
                        <div>资讯产品专家</div>
                    </div>
                    <div className={styles['footer-one']}>
                        <img src={OrcCode} />
                        <div>抖音扫码关注</div>
                        <div>在线讲解</div>
                    </div>
                    <div className={styles['footer-three']}>
                        <div><img alt="" src={Phone} />400-966-7200</div>
                        <div><img alt="" src={Internet} />www.dingdingnb.com</div>
                        <div><img alt="" src={Position} />杭州市余杭区町町路町町町楼321号</div>
                        <div><img alt="" src={Email} />DINGDING@gmail.com</div>
                    </div>
                </div>
                <div className={styles['footer-right']}>
                    {
                        footerData.map((itm, idx) => (
                            <div className={styles['right-item']}>
                                {
                                    itm.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles['footer-identify']}>
                <span>Copyright © 2020 Laaqiq. All Rights Reserved.</span>
                <img src={Social} alt="" />
            </div>
        </div>
    )
}

export default Footer
