import { useEffect, useState } from "react";
import { } from 'antd'
import styles from './index.module.scss'
import { productAllData, productData, productModuleData } from "../../data";
import { useNavigate } from "react-router-dom";
import { localParse } from '../../../../util'

const FourthContent = () => {
    const productAll = localParse('productAll') || {}
    const productAllType = localParse('productAllType') || []
    const productMap = new Map()
    productAllType.map((item) => productMap.set(item.id, item.name))

    const [currentTag, setCurrentTag] = useState(productAllType?.[0]?.id)

    const navigate = useNavigate()

    return (
        <div className={styles['fourth-content']}>
            <div className={styles['product-all']}>
                <div className={styles['product-title']}>
                    <h1 className={styles['title-one']}>产品</h1>
                    <h1 className={styles['title-two']}>概览</h1>
                    <span className={styles['title-three']}>overview</span>
                </div>

                <div className={styles['product-all-tag']}>
                    {productAllType?.map((item, index) =>
                        <span onClick={() => setCurrentTag(item.id)} className={`${styles['category-tag']} ${currentTag === item.id ? styles['category-active'] : ''}`} key={item.id}>{item.name}</span>
                    )}
                </div>

                <div className={styles['product-detail']}>
                    {
                        productAll[productMap.get(currentTag)]?.map((item, index) => (
                            <div className={styles['product-container']} >
                                <div className={styles['product-card']} key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <span className={styles['cate-title']} title={item.name}> {item.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div style={{ minHeight: "500px", transform: 'scale(0.9)' }}>
                {
                    productModuleData?.map((item, index) => (
                        <>
                            <div className={`${styles['product-' + ((index + 1) % 5)]}  ${styles['product-modules-all']}`} key={item.name}>
                                {item?.products.length ? <div className={styles['product-left']} id={item.subName}>
                                    <h1 className={styles['product-en']}>{item.subName}</h1>
                                    <h2 className={styles['product-zh']}>{item.name}</h2>
                                </div> : null}
                                <div className={styles['product-right']}>
                                    {item.products.map((itm, idx) => (
                                        <div className={`${styles['product-item-0']} ${styles['product-item-' + (idx > 2 ? 2 : idx)]}`}>
                                            <div className={styles['product-descrip']}>
                                                <div className={styles['p-title']} title={itm.name}>{itm.name}</div>
                                                <div className={styles['p-descrip']} title={itm.subName}>{itm.describe}</div>
                                            </div>
                                            <div className={styles['right-img']}>
                                                <img src={itm.icon} alt={itm.describe} />
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </div >
    )
}

export default FourthContent