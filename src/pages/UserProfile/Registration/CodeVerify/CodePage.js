import { Button, Input } from '@material-tailwind/react';
import React from 'react';

const CodePage = () => {
    return (
        <div>
            <div className='w-3/4 m-auto h-full md:w-3/6 lg:h-2/6 border rounded-xl p-4 mt-4 md:mt-8'>
                <h2 className='text-center my-4'>Верификация</h2>
                <p className='text-sm my-2'>Введите код из 6 цифр отправленного на номер /Номер пользователя ****//</p>
                <Input className='' label='Введите код из 6 цифр'></Input>
                <div className='mt-4'>
                <p className='text-xs my-2'>*Код обычно приходит в течении 5 минут. Если код не пришел, нажмите "Отправить повторно"</p>
                <Button variant='' size='md' color='red'>Подтвердить</Button>
                <Button variant='text' size='md' color='blue-gray' className='text-xs'>Отправить повторно</Button>
                </div>
            </div>
        </div>
    );
};

export default CodePage;