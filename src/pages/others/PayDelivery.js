import React from 'react';
import {useSelector} from "react-redux";

const PayNDelivery = () => {
    const userInfo = useSelector(state => state.user.userInfo)
    return (
        <div className="mt-14 md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">

            <div>
                <h2 className='text-2xl border-b border-b-blue-gray-400 pb-1 font-bold'>Оплата и доставка</h2>
                <h3 className='text-xl mt-10 font-medium '>Оплата</h3>
                <div className='flex flex-col gap-2 mt-4'>
                    <p> Для заказа, вам нужно авторизоваться или зарегистрироваться в личном кабинете.
                        <br/>
                        После заказа, если это оплата по (PayMe), вам будет доступна ссылка для оплаты вашего заказа.
                        Заказ будет взят в работу автоматически после поступления средств на расчетный счет. Отгрузка
                        производится день в день если заказ был оформлен до 9:00 утра или же на следующий день
                        (воскресенье
                        выходной).
                    </p>
                </div>
                <h3 className='text-xl mt-10 font-medium'>Доставка</h3>
                <div className='flex flex-col gap-2 mt-4'>
                    {
                        userInfo.role === 'superUser' ?
                            <p>
                                Принимаем заказы с Понедельника по Субботу с 09:00 до 17:00. Заказ сделанный до 10:00
                                утра, отгружается в этот же день и в течении дня. После 10:00 утра сделанный заказ
                                отгружается на следующий день.
                                Доставка БЕСПЛАТНО - при заказе на сумму выше 350.000 по г.Ташкенту с 12:00 и в течении
                                дня, с понедельника по субботу.
                            </p>
                            :
                            <p>
                                Принимаем заказы с Понедельника по Субботу с 09:00 до 17:00. Доставка оплачивается по тарифу Millenium - покупателем.
                                Заказ отправляется после оплаты.
                            </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default PayNDelivery;