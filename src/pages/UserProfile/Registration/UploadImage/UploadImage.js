import React, { useState } from 'react';
import styles from './UploadImage.module.css'
import axios from '../../../../store/axios';

const ImageUpload = ({ setList }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadPercentage, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadProgress(0);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            const response = await axios.post(`/upload `, formData);
            setList(response.data.imagePath)
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <div className={styles.upload_container}>
            <div className={styles.title2}>
                Фото карточки
            </div>
            <div className={styles.min_text}>

            </div>
            <input type="file" onChange={handleFileChange} accept='image/*' />
            <button onClick={handleUpload}>Загрузить</button>
            {uploadPercentage > 0 && (
                <div className={styles.progress_container}>
                    <div
                        className={styles.progress_bar}
                        style={{ width: `${uploadPercentage}%`, backgroundColor: '#4caf50' }}
                    >
                        {uploadPercentage}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
