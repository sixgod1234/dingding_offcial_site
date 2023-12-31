import { useEffect, useRef, useState } from 'react'
import NewsIntro from '../../../News/NewsIntro'
import styles from './index.module.scss'
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { cardData, firstContentImg, FirstImgContentData, personData, secondImgContentData } from '../../data'
import RightIcon from '../../../../assets/images/Slice 9.png'
import { localParse } from '../../../../util'

const FirstContent = ({ changeTab }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [personIndex, setPersonIndex] = useState(0)

    const headeData = localParse('homeData') || {}
    const { dingProfile, dingDescription, dingProfileImgs, productCase, coreAdvantages, teamStyle, teamIntroduction, splitTitle, splitContent, ...reset } = headeData
    let firstImgs = dingProfileImgs?.map((item) => item.url || '') || []
    let seconddata = productCase || []
    let adData = coreAdvantages || []
    let peData = teamStyle || []


    // type:加减 tag:是案例还是人物介绍
    const handleAddOrSubIndex = (type = '1', tag = '0') => {
        if (tag === '0') {
            switch (type) {
                case '0': seconddata?.length && setCurrentIndex(currentIndex === 0 ? seconddata.length - 1 : currentIndex - 1); break;
                case '1': seconddata?.length && setCurrentIndex(currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1); break;
            }
        } else {
            switch (type) {
                case '0': peData?.length && setPersonIndex(personIndex === 0 ? peData.length - 1 : personIndex - 1); break;
                case '1': peData?.length && setPersonIndex(personIndex === peData.length - 1 ? 0 : personIndex + 1); break;
            }
        }
    }

    return (
        <div className={styles['first-content']}>
            <div className={styles['home-content']}>
                <div className={styles['home-first-back']}>
                    {
                        firstImgs?.map((item, index) => <img key={index} className={styles[`first-${index == 0 ? 'one' : 'two'}-icon`]} src={item} alt="公司简介" />)
                    }
                </div>
                <div className={styles['home-first-content']}>
                    <h1 className={styles['content-title']}>Company Profile</h1>
                    <h2 className={styles['content-description']}>{dingProfile}</h2>
                    <div className={styles['content-subscription']}>{dingDescription}</div>
                    <div className={styles['content-img-container']}>
                        {
                            FirstImgContentData?.map((item, index) => (
                                <div key={index} className={styles['content-between']}>
                                    <img src={item.icon} alt="简介图" className={styles['content-img']} />
                                    <div className={styles['content-container']}>
                                        <div className={styles['content-icon-title']}>{item.title}</div>
                                        <div className={styles['content-icon-des']}>
                                            {reset[item.key] || 0}
                                            <span className={styles['content-extra']}>+</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles['center-content']} id="success-case">
                <div className={styles['home-second-content']}>
                    <div className={styles['content-title']}>Company Profile</div>
                    <div className={styles['content-description']}>町町的产品和解决方案，最厉害的町町</div>
                    <div className={styles['content-exam']}>
                        <div className={styles['content-left']}>
                            {seconddata?.length > 1 && (
                                <>
                                    <div onClick={() => handleAddOrSubIndex('0')}><UpOutlined /></div>
                                    <div onClick={() => handleAddOrSubIndex('1')}><DownOutlined /></div>
                                </>)
                            }
                        </div>
                        <div className={styles['content-right']}>
                            <div className={styles['content-title']}>the case</div>
                            <div className={styles['content-second-title']}>{seconddata?.[currentIndex]?.title}</div>
                            <div className={styles['content-des']}>
                                {seconddata?.[currentIndex]?.content}
                            </div>

                            {seconddata?.length > 1 && <div className={styles['content-next-title']}>{seconddata?.[currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1]?.title}</div>}
                            {seconddata?.length > 2 && <div className={styles['content-next-title']}>{seconddata?.[currentIndex > seconddata.length - 3 ? (currentIndex + 2 - seconddata.length) : currentIndex + 2]?.title}</div>}


                        </div>
                    </div>
                </div>
                <div className={styles['home-two-back']}>
                    {(seconddata?.length && seconddata?.length > 1) ? <img className={styles['second-one-icon']} src={seconddata?.[currentIndex === 0 ? (seconddata.length - 1) : (currentIndex - 1)]?.imgUrl?.[0]?.url} alt="成功案例图" /> : null}
                    {seconddata?.length ? <img className={styles['second-two-icon']} src={seconddata?.[currentIndex]?.imgUrl?.[0]?.url} alt="成功案例图" /> : null}
                    {(seconddata?.length && seconddata?.length > 2) ? <img className={styles['second-three-icon']} src={seconddata?.[currentIndex === seconddata.length - 1 ? 0 : currentIndex + 1]?.imgUrl?.[0]?.url} alt="成功案例图" /> : null}
                    {
                        seconddata?.length > 1 ? < img className={styles['second-four-icon']} src={RightIcon} alt="" onClick={() => handleAddOrSubIndex('1')} /> : null
                    }
                </div>
            </div>

            <div className={styles['three-content']} id='core-advantage'>
                <div className={styles['content-title']}>core advantages</div>
                <div className={styles['content-description']}>我们的核心优势</div>
                <div className={styles['three-img-container']}>
                    {
                        adData?.map((item, index) => (
                            <div key={index} className={`${styles['three-img-card']}`}>
                                {/* <div key={index} className={`${styles['three-img-card']} ${styles[index === 1 ? 'three-img-active' : '']}`}> */}
                                <span>0{index + 1}</span>
                                <div className={styles['three-title']}>{item.title}</div>
                                <div className={styles['three-descrip']}>{item.content}</div>
                                <img src={item.imgUrl?.[0]?.url} alt={item.title} className={styles['three-icon']} />
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
                    {(peData?.length && peData.length > 1) ? <img className={styles['second-one-icon']} src={peData[personIndex === 0 ? (peData.length - 1) : (personIndex - 1)]?.imgUrl?.[0]?.url} alt="员工图" /> : null}
                    {peData?.length ? <img className={styles['second-two-icon']} src={peData[personIndex]?.imgUrl?.[0]?.url} alt="员工图" /> : null}
                    {(peData?.length && peData.length > 2) ? <img className={styles['second-three-icon']} src={peData[personIndex === peData.length - 1 ? 0 : personIndex + 1]?.imgUrl?.[0]?.url} alt="员工图" /> : null}
                    {
                        peData?.length > 1 ? (
                            <>
                                <img className={styles['second-four-icon']} src={RightIcon} alt="向前" onClick={() => handleAddOrSubIndex('1', '1')} />
                                <img className={`${styles['second-four-icon']} ${styles['second-four-icon-two']}`} src={RightIcon} alt="向后" onClick={() => handleAddOrSubIndex('0', '1')} />
                            </>
                        ) : null
                    }
                </div>

                <div className={styles['home-second-content']} id="our-team">
                    <div className={styles['content-title']}>about Us</div>
                    <div className={styles['content-description']}>我们的团队</div>
                    <div className={styles['conten-sub']} title={teamIntroduction}>{teamIntroduction || '我们的团队介绍'}</div>
                    <div className={styles['content-exam']}>
                        <div className={styles['content-left']}>
                            {(peData?.length > 1) && (
                                <>
                                    <div onClick={() => handleAddOrSubIndex('0', '1')}><UpOutlined /></div>
                                    <div onClick={() => handleAddOrSubIndex('1', '1')}><DownOutlined /></div>
                                </>)
                            }
                        </div>
                        <div className={styles['content-right']}>
                            <div className={styles['content-title']} style={{ fontSize: '18px' }}>Character introduction</div>
                            <div className={styles['content-second-title']}>{peData?.[personIndex]?.title}</div>
                            <div className={styles['content-des']}>
                                {peData?.[personIndex]?.content}
                            </div>
                            {(peData?.length > 1) && <div className={styles['content-next-title']}>{peData[personIndex === peData?.length - 1 ? 0 : personIndex + 1]?.title}</div>}
                            {(peData?.length > 2) && <div className={styles['content-next-title']}>{peData[personIndex > peData?.length - 3 ? (personIndex + 2 - peData.length) : personIndex + 2]?.title}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <NewsIntro changeTab={changeTab} />
        </div >
    )
}

export default FirstContent