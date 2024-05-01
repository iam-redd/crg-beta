import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AllGoods.module.css'
import axios from '../../../store/axios'
import { ToastContainer, toast } from 'react-toastify';
import {
    Typography,
} from "@material-tailwind/react";
import { setAllProducts } from '../../../store/slices/serviceDataSlice';

const AllGoods = () => {
    const TABLE_HEAD = ['№', 'Названия', 'Топ', 'Стоп-лист', 'Удалить']
    const allProducts = useSelector(state => state.service.allProducts)
    const dispatch = useDispatch()
    const notify = (text, type) => {
        if (type === 'error') {
            toast.error(text, 'error')
        } else {
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

    const addInTop = async (id) => {
        try {
            const res = await axios.patch('/post/add-in-top', { postId: id })

            if (res.status === 200) {
                dispatch(setAllProducts(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromTop = async (id) => {
        try {
            const res = await axios.patch('/post/delete-from-top', { postId: id })

            if (res.status === 200) {
                dispatch(setAllProducts(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addInStop = async (id) => {
        try {
            const res = await axios.patch('/post/add-in-stop', { postId: id })

            if (res.status === 200) {
                dispatch(setAllProducts(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromStop = async (id) => {
        try {
            const res = await axios.patch('/post/delete-from-stop', { postId: id })

            if (res.status === 200) {
                dispatch(setAllProducts(res.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.wrapper}>
            <h2>Все товары</h2>
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
                                            product.topList? <button
                                                className='text-red-700 hover:text-white border border-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:red-green-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800'
                                                onClick={() => deleteFromTop(product._id)}
                                            >
                                                Из топа
                                            </button> :
                                                <button
                                                    onClick={() => addInTop(product._id)}
                                                    className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                                                >
                                                    В топ
                                                </button>
                                        }
                                    </td>
                                    <td>
                                    {
                                            product.stopList? <button
                                                className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                                                onClick={() => deleteFromStop(product._id)}
                                            >
                                                Из стопа
                                            </button> :
                                                <button
                                                    onClick={() => addInStop(product._id)}
                                                    className='text-red-700 hover:text-white border border-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:red-green-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800'
                                                >
                                                    В стоп
                                                </button>
                                        }
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