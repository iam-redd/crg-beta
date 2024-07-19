import React, { useRef, useState } from 'react';
import styles from './UploadImage.module.css'
import axios from '../../../../store/axios';
import icon from '../../../../assets/icons/uploadImage.png'
import url from '../../../../default.json'
import { DefaultSpinner } from '../../../../components/Spinner';
import {Button} from "@material-tailwind/react";
const ImageUpload = ({ list, setList , index}) => {
    const input = useRef()
    const [isLoading, setLoading] = useState(false)
    const handleUpload = async () => {
        try {
            setLoading(true)
            const image = input.current.files[0]
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post(`/upload `, formData);
            setList([...list,response.data.imagePath])
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        setLoading(false)
    };


    return (
        <div className={styles.upload_container}>
            <div className={styles.title2}>
                {
                    list.length > index?
                        
                        <img src={`${process.env.REACT_APP_SERVER}/${list[index]}`} alt="" /> : 
                        <>
                            {isLoading ?
                                <DefaultSpinner /> :
                                <Button onClick={() => input.current.click()}
                                variant="outlined"
                                className="flex items-center gap-3"
                                >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                                >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                                </svg>
                                Загрузите картинку
                                </Button>
                            }
                        </> 
                }
            </div>
            <input type="file" onChange={handleUpload} accept='image/*' hidden ref={input} />
        </div>
    );
};

export default ImageUpload;
