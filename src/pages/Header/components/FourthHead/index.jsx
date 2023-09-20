import { useEffect, useState } from 'react'
import styles from './index.module.scss'
const FourthHead = ({ title, content }) => {
    return (
        <div className={styles['fourth-head']}>
            <div className={styles['fourth-title']}>{title}</div>
            <div className={styles['fourth-descrip']}>{content}</div>
        </div>
    )
}

export default FourthHead