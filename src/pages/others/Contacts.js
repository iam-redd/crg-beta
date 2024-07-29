import React from 'react';
import {Button} from "@material-tailwind/react";
import YMap from "../../components/YMap";

const Contacts = () => {
    return (
        <div className="mt-14 md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div className='w-full'>
                <h2 className='text-2xl border-b border-b-blue-gray-400 pb-1 font-bold'>
                    Контакты
                </h2>
                <h3 className='text-xl mt-10 font-medium '>OOO "Coffee Roastery Group"</h3>
                <p className='text-lg py-2'>
                    Г. Ташкент, Шайхонтахурский р-н, Ул. Кукча Дарвоза Кунчилик-37
                    <br/>Телефон:
                    <span className='mx-1.5 cursor-pointer hover:text-red-500'><a href="tel:+998998992012">+998(99) 899-20-12</a></span>
                    ,
                    <span className='mx-1.5 cursor-pointer hover:text-red-500'><a href='tel:+998909555562'>+998(90) 955-55-62</a></span>
                </p>
                <a href='https://t.me/coffee_zdes' target='_blank'>
                    <Button color='red' variant='outlined' className="flex items-center gap-3 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-telegram" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                        </svg>
                        Связаться с нами в Telegram
                    </Button>
                </a>
                <p className='text-lg font-medium mt-4'>Как до нас добраться?
                    <a href='https://yandex.uz/maps/-/CDbD505E' target='_blank' rel='noreferrer'>
                    <span className='hover:text-red-400 ml-2'>
                        Яндекс.Карты
                    </span>
                    </a>
                </p>
            </div>


        </div>
    )
        ;
};

export default Contacts;