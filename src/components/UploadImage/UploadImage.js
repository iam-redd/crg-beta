import React, { useRef, useState } from 'react';
import styles from './UploadImage.module.css'
import axios from '../../store/axios';
import icon from '../../assets/icons/uploadImage.png'
import url from '../.././default.json'
import { DefaultSpinner } from '../Spinner';
const ImageUpload = ({ list, setList }) => {
    const input = useRef()
    const [isLoading, setLoading] = useState(false)
    const handleUpload = async () => {
        try {
            setLoading(true)
            const image = input.current.files[0]
            console.log(image)
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post(`/upload `, formData);
            setList(response.data.imagePath)
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        setLoading(false)
    };


    return (
        <div className={styles.upload_container}>
            <div className={styles.title2}>
                {
                    list === null ?
                        <>
                            {isLoading ?
                                <DefaultSpinner /> :
                                <img src={icon} alt="" onClick={() => input.current.click()} />
                            }
                        </> :
                        <img src={`${url.backendUrl}/${list}`} alt="" />
                }
            </div>
            <input type="file" onChange={handleUpload} accept='image/*' hidden ref={input} />
        </div>
    );
};

export default ImageUpload;
