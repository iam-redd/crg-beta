import React, { useState } from 'react'
import styles from './CoffeBeans.module.css'
import UploadImage from '../../../UserProfile/Registration/UploadImage/UploadImage'
import icon from '../../../../assets/icons/addImage.png'
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
                            <UploadImage list={image} setList={setImage} /> :
                            <div className={styles.btn}>
                                <img src={icon} className={styles.btnImg} alt="" onClick={()=> setSecondImage(true)} />
                            </div>
                    }
                    {
                        secondImage && thirdImage ?
                            <UploadImage list={image} setList={setImage} /> :
                            <div className={styles.btn}>
                                <img src={icon} className={styles.btnImg} alt="" onClick={()=> setThirdImage(true)} />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
