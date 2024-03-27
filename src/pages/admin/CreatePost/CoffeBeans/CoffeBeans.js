import React, { useState } from 'react'
import styles from './CoffeBeans.module.css'
import UploadImage from '../UploadImage/UploadImage'
import icon from '../../../../assets/icons/addImage.png'
export default function CoffeBeans() {
    const [images, setImages] = useState([])
    const [secondImage, setSecondImage] = useState(false)
    const [thirdImage, setThirdImage] = useState(false)
    console.log(images)
    return (
        <div className={styles.container}>
            <div className={styles}>
            Загрузить фото
                <Upload
                    images={images}
                    setImages={setImages}
                    secondImage={secondImage}
                    setSecondImage={setSecondImage}
                    thirdImage={thirdImage}
                    setThirdImage={setThirdImage} />
            </div>
        </div>
    )
}


const Upload = ({ images, setImages, secondImage, setSecondImage, thirdImage, setThirdImage }) => {
    return (
        <div className={styles.imageWrapper}>
            
            <UploadImage list={images} setList={setImages} index={0} />
            {
                secondImage ?
                    <UploadImage list={images} setList={setImages} index={1} /> :
                    <div className={styles.btn}>
                        <img src={icon} className={styles.btnImg} alt="" onClick={() => setSecondImage(true)} />
                    </div>
            }
            {
                secondImage && thirdImage ?
                    <UploadImage list={images} setList={setImages} index={2} /> :
                    <div className={styles.btn}>
                        <img src={icon} className={styles.btnImg} alt="" onClick={() => setThirdImage(true)} />
                    </div>
            }
        </div>
    )
}
