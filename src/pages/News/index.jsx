import { useEffect, useState } from "react";
import NewsIntro from "./NewsIntro";
import NewsSecond from "./NewsSecond";

const News = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    return (
        <>
            {currentIndex === 0 && <NewsIntro />}
            {currentIndex === 1 && <NewsSecond />}
        </>
    )
}

export default News