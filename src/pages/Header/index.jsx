import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import FirstHead from './components/FirstHead'
import SecondHead from './components/SecondHead'
import FourthHead from './components/FourthHead'

const Header = ({ domRef, currentTab }) => {
    const [headData, setHeadData] = useState([
        { title: '值得信赖的产品', content: '我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。' },
        { title: '值得信赖的町町解决方案', content: '我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。' },
        { title: '町町的成功案例成功案例', content: '我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。' },
        { title: '联系值得信赖的町町', content: '我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。' },
        { title: '关于町町关于我们', content: '我们在这里帮助您更好地使用我们的服务。 首先，让我们弄清楚我们的文档中是否有解决方案。' },
    ])
    // 0:首页, 1:产品中心,2:解决方案 ,3:成功案例,4:联系我们,5:关于我们,6:搜索,7:搜索行业资讯/最新文章
    return (
        <>
            {currentTab === 0 && <FirstHead />}
            {currentTab === 1 && <FourthHead {...headData[0]} />}
            {currentTab === 2 && <FourthHead {...headData[1]} />}
            {currentTab === 3 && <FourthHead {...headData[2]} />}
            {currentTab === 4 && <FourthHead {...headData[3]} />}
            {currentTab === 5 && <FourthHead {...headData[4]} />}
            {currentTab === 6 && null}
            {currentTab === 7 && null}
        </>
    )
}
export default Header