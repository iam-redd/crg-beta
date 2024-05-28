import React from 'react';

const PayNDelivery = () => {
    return (
        <div className="md:h-full sm:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
           <h2 className='text-2xl mt-10'>Оплата и доставка</h2>
            <div>
                <h3 className='text-lg'>Оплата</h3>
                <p> Для заказа, вам нужно авторизоваться или зарегистрироваться в личном кабинете.
                    <br/>
                    После заказа, если это оплата по (PayMe), вам будет доступна ссылка для оплаты вашего заказа.
                    Заказ будет взят в работу автоматически после поступления средств на расчетный счет. Отгрузка производится день в день если заказ был оформлен до 9:00 утра или же на следующий день (воскресенье выходной).
                </p>
            </div>
        </div>
    );
};

export default PayNDelivery;