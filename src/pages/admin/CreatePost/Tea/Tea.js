import React, { useState } from 'react'
import styles from '../CoffeBeans/CoffeBeans.module.css'
import UploadImage from '../UploadImage/UploadImage'
import icon from '../../../../assets/icons/addImage.png'
import axios from '../../../../store/axios'
import {
    Input,
    Checkbox,
    Button,
    Radio
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom'

export default function Tea() {
    const [images, setImages] = useState([])
    const [secondImage, setSecondImage] = useState(false)
    const [thirdImage, setThirdImage] = useState(false)
    let colorTea = 'Черный'
    const navigate = useNavigate()

    async function onSubmit(e) {
        try {
            e.preventDefault()
            const options = {
                name: e.target.name.value,
                priceUser: [],
                priceWS: [],
                img: images,
                type: 'tea',
                description: e.target.description.value,
                package: [],
                tags: e.target.tags.value.split(',').map(element => element.trim().toLowerCase()),
                color:colorTea
            }

            e.target.price1.value !== '' && options.priceUser.push(totalCost(e.target.price1.value))
            e.target.price2.value !== '' && options.priceUser.push(totalCost(e.target.price2.value))
            e.target.price3.value !== '' && options.priceUser.push(totalCost(e.target.price3.value))
            e.target.price4.value !== '' && options.priceUser.push(totalCost(e.target.price4.value))
            e.target.price5.value !== '' && options.priceUser.push(totalCost(e.target.price5.value))

            e.target.priceWs1.value !== '' && options.priceWS.push(totalCost(e.target.priceWs1.value))
            e.target.priceWs2.value !== '' && options.priceWS.push(totalCost(e.target.priceWs2.value))
            e.target.priceWs3.value !== '' && options.priceWS.push(totalCost(e.target.priceWs3.value))
            e.target.priceWs4.value !== '' && options.priceWS.push(totalCost(e.target.priceWs4.value))
            e.target.priceWs5.value !== '' && options.priceWS.push(totalCost(e.target.priceWs5.value))

            e.target.weight1.checked ? options.package.push(true) : options.package.push(false)
            e.target.weight2.checked ? options.package.push(true) : options.package.push(false)
            e.target.weight3.checked ? options.package.push(true) : options.package.push(false)
            e.target.weight4.checked ? options.package.push(true) : options.package.push(false)
            e.target.weight5.checked ? options.package.push(true) : options.package.push(false)

            console.log(options)

            const request = await axios.post('/post/create/tea', options)

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
                <div className="">Цена для розницы</div>
                <div className="flex">
                    <Input
                        type="text"
                        label='Цена крафт пакет 40гр'
                        name='price1'
                        className={styles.input} />
                    <Input
                        type="text"
                        label='Цена крафт пакет 3кг'
                        name='price2'
                        className={styles.input} />
                    <Input
                        type="text"
                        label='Цена крафт пакет 5кг'
                        name='price3'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена Картонная 100гр'
                        name='price4'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена Алюминиевая 100гр'
                        name='price5'
                        className={styles.input}/>
                </div>
                <div className="">Цена для оптовиков</div>
                <div className="flex">
                    <Input
                        type="text"
                        label='Цена крафт пакет 40гр'
                        name='priceWs1'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена крафт пакет 3кг'
                        name='priceWs2'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена крафт пакет 5кг'
                        name='priceWs3'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена Картонная 100гр'
                        name='priceWs4'
                        className={styles.input}/>
                    <Input
                        type="text"
                        label='Цена Алюминиевая 100гр'
                        name='priceWs5'
                        className={styles.input}/>
                </div>
                <div className="">Упаковка</div>
                <div className="flex">
                    <Checkbox
                        color="red"
                        label="Крафт пакет 40гр"
                        name='weight1'/>
                    <Checkbox
                        color="red"
                        label="Крафт пакет 3кг"
                        name='weight2'/>
                    <Checkbox
                        color="red"
                        label="Крафт пакет 5кг"
                        name='weight3'/>
                    <Checkbox
                        color="red"
                        label="Картонная 100гр"
                        name='weight4'/>
                    <Checkbox
                        color="red"
                        label="Алюминиевая 100гр"
                        defaultChecked
                        name='weight5'/>
                </div>
                <div className="flex gap-10">
                    <Radio name="type" label="Чёрный"  defaultChecked onChange={()=> colorTea = 'Чёрный чай'}/>
                    <Radio name="type" label="Зелёный" onChange={()=> colorTea = 'Зелёный чай'}/>
                    <Radio name="type" label="Белый" onChange={()=> colorTea = 'Белый чай'}/>
                    <Radio name="type" label="Улун" onChange={()=> colorTea = 'Улун чай'}/>
                </div>
                <p className='text-xs'>Для оптимизации поиска товара, название на кириллице и на русском</p>
                <Input
                    type="text"
                    label='Тэги через запятую ( , )'
                    name='tags'
                    required
                    className={styles.input}/>
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


const Upload = ({images, setImages, secondImage, setSecondImage, thirdImage, setThirdImage }) => {
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
