import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import FirstContent from './components/FirstContent'
import SecondContent from './components/SecondContent'
import ThirdContent from './components/ThirdContent'
import FourthContent from './components/FourthContent'
import FifthContent from './components/FifthContent'
import SixContent from './components/SixContent'
import SevenContent from './components/SevenContent'
import EightContent from './components/EightContent'

const Content = ({ currentTab, changeTab }) => {
    // 0:首页, 1:产品中心,2:解决方案 ,3:成功案例,4:联系我们,5:关于我们,6:搜索,7:搜索行业资讯带关键词,8:最新新闻
    return (
        <div style={{ minHeight: "500px" }}>
            {currentTab === 0 && <FirstContent changeTab={changeTab} />}
            {currentTab === 1 && <FourthContent />}
            {currentTab === 2 && <FifthContent />}
            {currentTab === 3 && <SixContent />}
            {currentTab === 4 && <SevenContent />}
            {currentTab === 5 && <EightContent />}
            {currentTab === 6 && <SecondContent changeTab={changeTab} />}
            {currentTab === 7 && <ThirdContent currentTab={currentTab} />}
            {currentTab === 8 && <ThirdContent currentTab={currentTab} />}
        </div>
    )
}

export default Content