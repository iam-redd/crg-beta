import React, { useState } from 'react'
import styles from '../CoffeBeans/CoffeBeans.module.css'
import UploadImage from '../UploadImage/UploadImage'
import icon from '../../../../assets/icons/addImage.png'
import axios from '../../../../store/axios'
import {
    Input,
    Select,
    Option,
    Button
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom'

export default function Other() {
    const [images, setImages] = useState([])
    const [secondImage, setSecondImage] = useState(false)
    const [thirdImage, setThirdImage] = useState(false)
    const [selectValue, setValue] = useState(null)

    const navigate = useNavigate()

    async function onSubmit(e) {
        try {
            e.preventDefault()
            const options = {
                name: e.target.name.value,
                priceUser: [],
                priceWS: [],
                img: images,
                type: selectValue,
                description: e.target.description.value,
            }

            e.target.price1.value !== '' && options.priceUser.push(totalCost(e.target.price1.value))
            e.target.priceWs1.value !== '' && options.priceWS.push(totalCost(e.target.priceWs1.value))

            console.log(options)

            const request = await axios.post('/post/create/other', options)

            console.log(request)
            navigate('/shop')
        } catch (err) {
            console.log(err.message)
        }
    }
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
            <form
                className={styles.inputWrapper}
                onSubmit={onSubmit}>
                <Input
                    type="text"
                    label='Названия'
                    name='name'
                    className={styles.input} />
                {/* <div className="">Цена для пользователей</div> */}
                <div className="flex">
                    <Input
                        type="text"
                        label='Цена для пользователей'
                        name='price1'
                        className={styles.input} />
                    <Input
                        type="text"
                        label='Цена для оптовиков'
                        name='priceWs1'
                        className={styles.input} />
                    <Select
                        size="md"
                        label="Тип товара"
                        name='type'
                        onChange={(e) => setValue(e)}>
                        <Option value='syrup'>Сироп</Option>
                        <Option value='accessory'>Аксессуар</Option>
                        <Option value='chemistry'>Химия</Option>
                        <Option value='coffee-capsule'>Кофе в капсуле</Option>
                    </Select>
                </div>
                <div class="relative w-full min-w-[200px]">
                    <textarea
                        class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        name='description'>
                    </textarea>
                    <label
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Описания
                    </label>
                </div>
                <Button
                    color='red'
                    className='sz-2'
                    variant="outlined"
                    type='submit'>Добавить</Button>
            </form>
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


function totalCost(e) {
    let price = e.split('')
    let str = []
    price = price.reverse()
    price.map((item, index) => {
        if (index === 2 || index === 5 || index === 8) {
            str.push(item)
            if ((index + 1) !== price.length) {
                str.push(' ')
            }
        } else {
            str.push(item)
        }
    })
    str = str.reverse().join('')
    return str
}
