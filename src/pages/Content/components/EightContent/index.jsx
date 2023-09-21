import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import NewsIntro from '../../../News/NewsIntro'
import styles from './index.module.scss'
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { honorBackground, personData, firstContentImg } from '../../data'
import RightIcon from '../../../../assets/images/Slice 9.png'
import Macy from 'macy'

const EightContent = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [personIndex, setPersonIndex] = useState(0)
    const [masonry, setMasonry] = useState(null)

    const headeData = JSON.parse(localStorage.getItem('homeData') || '{}') || '{}'
    const { companyStyle, companyDescription, companyIntroduction, honorWall } = headeData
    let imgs = companyStyle?.map((item) => item.url || '') || []
    let honors = honorWall?.map((item) => item.url || '') || []

    useEffect(() => {
        getMacy()
    }, [])

    useLayoutEffect(() => {
        masonry && masonry.runOnImageLoad(function () {
            masonry.recalculate(true);
        }, true);
    })

    const getMacy = () => {
        if (masonry) {
            masonry.reInit()
        } else {
            let masonry = new Macy({
                container: '.macy-container', // 图像列表容器
                trueOrder: false,
                waitForImages: false,
                useOwnImageLoader: false,
                debug: true,
                margin: { x: 35, y: 35 },    // 设计列与列的间距
                columns: 3,    // 设置列数
            })
            setMasonry(masonry)
        }
    }

    // type:加减 tag:是案例还是人物介绍
    const handleAddOrSubIndex = (type = '1', tag = '0') => {
        if (tag === '0') {
            switch (type) {
                case '0': setCurrentIndex(currentIndex === 0 ? imgs.length - 1 : currentIndex - 1); break;
                case '1': setCurrentIndex(currentIndex === imgs.length - 1 ? 0 : currentIndex + 1); break;
            }
        } else {
            switch (type) {
                case '0': setPersonIndex(personIndex === 0 ? personData.length - 1 : personIndex - 1); break;
                case '1': setPersonIndex(personIndex === personData.length - 1 ? 0 : personIndex + 1); break;
            }
        }
    }

    return (
        <div className={styles['first-content']}>
            <div className={styles['center-content']}>
                <div className={styles['home-two-back']}>
                    {(imgs?.length > 1) ? <img className={styles['second-one-icon']} src={imgs[currentIndex === 0 ? (imgs.length - 1) : (currentIndex - 1)]} alt="" /> : null}
                    {imgs?.length ? <img className={styles['second-two-icon']} src={imgs[currentIndex]} alt="" /> : null}
                    {imgs?.length > 2 ? <img className={styles['second-three-icon']} src={imgs[currentIndex === imgs.length - 1 ? 0 : currentIndex + 1]} alt="" /> : null}
                    {(imgs?.length > 1) ? <img className={styles['second-four-icon']} src={RightIcon} alt="" onClick={() => handleAddOrSubIndex('1')} /> : null}
                </div>
                <div className={styles['home-second-content']}>
                    <div className={styles['content-title']}>Company Profile</div>
                    <div className={styles['content-description']}>{companyIntroduction || '町町的产品和解决方案，最厉害的町町'}</div>
                    <div className={styles['content-exam']} title={companyDescription}>
                        {companyDescription || '司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍。'}
                    </div>
                </div>
            </div>

            <div className={styles['honor-content']}>
                <div className={styles['content-title']}>
                    Honor and Qualification
                </div>
                <div className={styles['content-title-container']}>
                    <div className={styles['content-description']}>
                        我们的荣誉资质
                    </div>
                    <div className={styles['content-right']}>
                        {
                            honorBackground.length > 6 && (
                                <>
                                    <div onClick={() => handleAddOrSubIndex('0')}><UpOutlined /></div>
                                    <div onClick={() => handleAddOrSubIndex('1')}><DownOutlined /></div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className={`${styles['honor-background']} macy-container`}>
                    {
                        honors?.map((item, index) => <img key={index} src={item} alt="" className={styles['honoe-img']} />)
                    }
                </div>
            </div>
        </div >
    )
}

export default EightContent