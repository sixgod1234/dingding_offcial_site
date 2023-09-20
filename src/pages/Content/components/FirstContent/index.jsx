import { useEffect, useRef, useState } from 'react'
import NewsIntro from '../../../News/NewsIntro'
import styles from './index.module.scss'
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { cardData, firstContentImg, FirstImgContentData, personData, secondImgContentData } from '../../data'
import RightIcon from '../../../../assets/images/Slice 9.png'

const FirstContent = ({ changeTab }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [personIndex, setPersonIndex] = useState(0)

    const headeData = JSON.parse(localStorage.getItem('homeData') || '{}') || '{}'
    const { dingProfile, dingDescription, dingProfileImgs, productCase, coreAdvantages, teamStyle, teamIntroduction, splitTitle, splitContent, ...reset } = headeData
    let firstImgs = dingProfileImgs.map((item) => item.url || '') || firstContentImg
    let seconddata = productCase || secondImgContentData
    let adData = coreAdvantages || cardData
    let peData = teamStyle || personData


    // type:加减 tag:是案例还是人物介绍
    const handleAddOrSubIndex = (type = '1', tag = '0') => {
        if (tag === '0') {
            switch (type) {
                case '0': setCurrentIndex(currentIndex === 0 ? seconddata.length - 1 : currentIndex - 1); break;
                case '1': setCurrentIndex(currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1); break;
            }
        } else {
            switch (type) {
                case '0': setPersonIndex(personIndex === 0 ? peData.length - 1 : personIndex - 1); break;
                case '1': setPersonIndex(personIndex === peData.length - 1 ? 0 : personIndex + 1); break;
            }
        }
    }

    return (
        <div className={styles['first-content']}>
            <div className={styles['home-content']}>
                <div className={styles['home-first-back']}>
                    <img className={styles['first-one-icon']} src={firstImgs[0]} alt="" />
                    <img className={styles['first-two-icon']} src={firstImgs[1]} alt="" />
                </div>
                <div className={styles['home-first-content']}>
                    <div className={styles['content-title']}>Company Profile</div>
                    <div className={styles['content-description']}>{dingProfile || '町町啊啊啊最厉害的町町啊啊啊'}</div>
                    <div className={styles['content-subscription']}>{dingDescription || '通过智能硬件与大数据结合，让传统餐饮供应链进入大数据智能时代'}</div>
                    <div className={styles['content-img-container']}>
                        {
                            FirstImgContentData.map((item, index) => (
                                <div key={index} className={styles['content-between']}>
                                    <img src={item.icon} alt="" className={styles['content-img']} />
                                    <div className={styles['content-container']}>
                                        <div className={styles['content-icon-title']}>{item.title}</div>
                                        <div className={styles['content-icon-des']}>
                                            {reset[item.key] || item.dataNum}
                                            <span className={styles['content-extra']}>+</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles['center-content']}>
                <div className={styles['home-second-content']}>
                    <div className={styles['content-title']}>Company Profile</div>
                    <div className={styles['content-description']}>町町的产品和解决方案，最厉害的町町</div>
                    <div className={styles['content-exam']}>
                        <div className={styles['content-left']}>
                            <div onClick={() => handleAddOrSubIndex('0')}><UpOutlined /></div>
                            <div onClick={() => handleAddOrSubIndex('1')}><DownOutlined /></div>
                        </div>
                        <div className={styles['content-right']}>
                            <div className={styles['content-title']}>the case</div>
                            <div className={styles['content-second-title']}>{seconddata[currentIndex]?.title}</div>
                            <div className={styles['content-des']}>
                                {seconddata[currentIndex].content}
                            </div>
                            <div className={styles['content-next-title']}>{seconddata[currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1]?.title}</div>
                            <div className={styles['content-next-title']}>{seconddata[currentIndex > seconddata.length - 3 ? (currentIndex + 2 - seconddata.length) : currentIndex + 2]?.title}</div>
                        </div>
                    </div>
                </div>
                <div className={styles['home-two-back']}>
                    <img className={styles['second-one-icon']} src={seconddata[currentIndex === 0 ? (seconddata.length - 1) : (currentIndex - 1)]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-two-icon']} src={seconddata[currentIndex]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-three-icon']} src={seconddata[currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-four-icon']} src={RightIcon} alt="" onClick={() => handleAddOrSubIndex('1')} />
                </div>
            </div>

            <div className={styles['three-content']}>
                <div className={styles['content-title']}>core advantages</div>
                <div className={styles['content-description']}>我们的核心优势</div>
                <div className={styles['three-img-container']}>
                    {
                        adData.map((item, index) => (
                            <div key={index} className={`${styles['three-img-card']}`}>
                                {/* <div key={index} className={`${styles['three-img-card']} ${styles[index === 1 ? 'three-img-active' : '']}`}> */}
                                <span>0{index + 1}</span>
                                <div className={styles['three-title']}>{item.title}</div>
                                <div className={styles['three-descrip']}>{item.content}</div>
                                <img src={item.imgUrl?.[0]?.url} alt="" className={styles['three-icon']} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles['four-content-contain']}>
                <div className={styles['four-title']}>{splitTitle}</div>
                <div className={styles['four-description']}>{splitContent}</div>
            </div>

            <div className={`${styles['center-content']} ${styles['five-content']}`}>
                <div className={styles['home-two-back']}>
                    <img className={styles['second-one-icon']} src={peData[personIndex === 0 ? (peData.length - 1) : (personIndex - 1)]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-two-icon']} src={peData[personIndex]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-three-icon']} src={peData[personIndex === peData.length - 1 ? 0 : personIndex + 1]?.imgUrl?.[0]?.url} alt="" />
                    <img className={styles['second-four-icon']} src={RightIcon} alt="" onClick={() => handleAddOrSubIndex('1', '1')} />
                    <img className={`${styles['second-four-icon']} ${styles['second-four-icon-two']}`} src={RightIcon} alt="" onClick={() => handleAddOrSubIndex('0', '1')} />
                </div>

                <div className={styles['home-second-content']}>
                    <div className={styles['content-title']}>about Us</div>
                    <div className={styles['content-description']}>我们的团队</div>
                    <div className={styles['conten-sub']} title={teamIntroduction}>{teamIntroduction || '我们的团队介绍'}</div>
                    <div className={styles['content-exam']}>
                        <div className={styles['content-left']}>
                            <div onClick={() => handleAddOrSubIndex('0', '1')}><UpOutlined /></div>
                            <div onClick={() => handleAddOrSubIndex('1', '1')}><DownOutlined /></div>
                        </div>
                        <div className={styles['content-right']}>
                            <div className={styles['content-title']}>Character introduction</div>
                            <div className={styles['content-second-title']}>{peData[personIndex]?.title}</div>
                            <div className={styles['content-des']}>
                                {peData[personIndex].content}
                            </div>
                            <div className={styles['content-next-title']}>{peData[personIndex === peData.length - 1 ? 0 : personIndex + 1]?.title}</div>
                            <div className={styles['content-next-title']}>{peData[personIndex > peData.length - 3 ? (personIndex + 2 - peData.length) : personIndex + 2]?.title}</div>
                        </div>
                    </div>
                </div>
            </div>
            <NewsIntro changeTab={changeTab} />
        </div>
    )
}

export default FirstContent