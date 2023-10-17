import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import HeaderRight from '../../../../assets/images/Slice 4.png'
import { headerImg } from '../../../Content/data'
import { Carousel } from 'antd';
import { localParse } from '../../../../util'

const FirstHead = () => {
    const headeData = localParse('homeData') || {}
    const { headEnTitle, headZnTitle, headDescription, carouselImgs } = headeData
    let headerImgs = carouselImgs?.map((item) => item.url || '') || headerImg

    return (
        <div className={styles['first-content']}>
            <div className={styles['header-left']}>
                <h1 className={styles['left-title-one']}>{headEnTitle || 'Sience xxxx womenshishui'}</h1>
                <h1 className={styles['left-title-two']}>{headZnTitle || '町町使一切成为可能物联网领军'}</h1>
                {/* <div className={styles['left-title-three']}>{'物联网领军'}</div> */}
                <p className={styles['left-title-four']}>{headDescription || '辅助信息的文字示例文本，天空万里无云呈深蓝色。 我们面前的景象确实是崇高的。'}</p>
            </div>
            <div className={styles['header-right']}>
                <Carousel autoplay dots={false}>
                    {headerImgs?.map((item, index) => <img key={index} src={item} alt="轮播图" />)}
                </Carousel>
            </div>
        </div>
    )
}

export default FirstHead