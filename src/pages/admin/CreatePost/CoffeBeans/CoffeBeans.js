import React, { useState } from 'react'
import styles from './CoffeBeans.module.css'
import UploadImage from '../../../../components/UploadImage/UploadImage'
import icon from '../../../../'
export default function CoffeBeans() {
    const [image, setImage] = useState(null)
    const [secondImage, setSecondImage] = useState(false)
    const [thirdImage, setThirdImage] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles}>
                <div className={styles.imageWrapper}>
                    <UploadImage list={image} setList={setImage} />
                    {
                        secondImage ?
                            <UploadImage list={secondImage} setList={setImage} /> :
                            <div className={styles.btn}></div>
                    }
                </div>
            </div>
        </div>
    )
}
