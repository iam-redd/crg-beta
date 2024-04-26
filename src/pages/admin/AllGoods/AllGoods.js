import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card/Card';
import styles from './AllGoods.module.css'
import url from '../../../default.json'
import icon from '../../../assets/icons/user.png'
import axios from '../../../store/axios'
import { ToastContainer, toast } from 'react-toastify';
import {
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { setAllProducts } from '../../../store/slices/serviceDataSlice';

const AllGoods = () => {
    const TABLE_HEAD = ['№', 'Названия', 'Обьём', 'Топ', 'Стоп-лист', 'Удалить']
    const optionCoffe = ['250гр', '500гр', '1000гр']
    const allProducts = useSelector(state => state.service.allProducts)
    const dispatch = useDispatch()
    const notify = (text, type) => {
        if(type === 'error'){
            toast.error(text, 'error')
        }else{
            toast.success(text, 'error')
        }

    };
    const deleteProduct = async (id) => {
        try {
            console.log(id)
            const options = {
                postId: id
            }
            const res = await axios.post('/post', options)
            if (res.status === 200) {
                dispatch(setAllProducts(res.data))
                notify('Товар удален', 'success')
            }
            console.log(res)
        } catch (e) {
            console.log(e)
            notify('Не получилось удалит товар', 'error')
        }
    }
    return (
        <div className={styles.wrapper}>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head._id}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allProducts !== null &&
                        allProducts.map((product, index) => {
                            return (
                                <tr className={styles.tr} key={index}>
                                    <td>{index + 1}</td>
                                    {/* <td><img className={styles.trImage} src={`${url.backendUrl}/${product.img}`} alt="" /></td> */}
                                    <td>{product.name}</td>
                                    <td>
                                        {
                                            product.type === 'syrup' || product.type === 'syrup' || product.type === 'chemistry' || product.type === 'coffee-capsule' ?
                                                <p>1шт</p> :
                                                <>
                                                    {
                                                        product.type === 'tea' ?
                                                            <Select
                                                                size="md"
                                                                label="Тип товара">
                                                                <Option></Option>
                                                            </Select> :
                                                            <Select
                                                                size="md"
                                                                label="Тип товара">
                                                                {
                                                                    product.weight.map((bool, index) => <Option
                                                                        value={optionCoffe[index]}
                                                                        disabled={!bool}
                                                                    >
                                                                        {optionCoffe[index]}
                                                                    </Option>)
                                                                }
                                                            </Select>
                                                    }
                                                </>
                                        }

                                    </td>
                                    <td>
                                        <button className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>В топ</button>
                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        <button
                                            className='text-red-700 hover:text-white border border-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:red-green-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800'
                                            onClick={() => deleteProduct(product._id)}
                                        >Удалить
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {/* {
                allProducts !== null &&
                <>
                    {
                        allProducts.map((product, index) => {
                            return <Card
                                key={index}
                                name={product.name}
                                image={product.img}
                            />
                        })
                    }
                </>
            } */}
            <ToastContainer
            autoClose={3000} />
        </div>
    );
};

export default AllGoods;