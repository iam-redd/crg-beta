import React from 'react';
import { Typography } from "@material-tailwind/react";

import facebookIcon from "../assets/icons/facebook.png";
import telegramIcon from "../assets/icons/telegram-logo.png";
import instagramIcon from "../assets/icons/instagram-logo.png";

import logoIcon from '../assets/icons/Coffee_Roastery_logo.svg'
import YMap from './YMap';

const LINKS = [
  {
    title: "Страницы",
    items: ["Главная", "Магазин","Школа бариста", "Личный кабинет", "Рецепты", "Энциклопедия"],
  },
  {
    title: "Каталог",
    items: ["Кофе", "Чаи", "Сиропы", "Химия", "Аксессуары"],
  },
  {
    title: "Прочее",
    items: ["О нас", "Оплата и доставка", "ОПТ", "Контакты", "Политика конфеденциальности", "Публичная оферта"],
  },
];

const Footer = () => {
    return (
      <footer className="mx-auto bg-gray-100 pb-5 max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 lg:px-8 lg:py-4 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      
      <div className='flex w-full flex-wrap lg:flex-nowrap'>
        

        <div className='flex flex-wrap md:flex-nowrap'>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 justify-between gap-2 text-start text-xs">
        <div className='mr-4'>
          <div className='flex'>
            <div className='mr-2'>
            <img width={70} src={logoIcon} alt='logo' />
            </div>
            <div className='w-16'>
            <p className='font-bold leading-none'>COFFEE ROASTERY GROUP</p>
            <div className='flex mt-2 gap-2'>
              <a href='https://www.instagram.com/coffeeroasterygroup/' title='Instagram' target='_blank' rel='noreferrer'><img width={18} src={instagramIcon} alt='' /></a>
              <a href='https://t.me/CoffeeRoasteryGroup_bot' title='Telegram' target='_blank' rel='noreferrer'><img width={18} src={telegramIcon} alt='' /></a>
              <a href='https://www.facebook.com/people/Coffee-Roastery-Group/100089262537599/?mibextid=LQQJ4d' title='Facebook' target='_blank' rel='noreferrer'><img width={18} src={facebookIcon} alt='' /></a>
            </div>
            </div>
          </div>
          <p className="font-normal text-xs mt-4">
            &copy; 2018 COFFEE ROASTERY GROUP
          </p>
        </div>
            {LINKS.map(({ title, items }) => (
              <ul key={title} className='mx-1'>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="text-xs py-1 font-normal transition-colors hover:text-red-400"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}  
              </ul>
            ))}
            <div className='col-span-2 overflow-hidden h-48'>
            <a href='https://yandex.uz/maps/-/CDbD505E' target='_blank' rel='noreferrer'><p className='text-xs font-medium mb-2 opacity-70 hover:text-red-400'>Адрес: г.Ташкент, Шайхантахурский район, Кончилик 37</p></a>
            <YMap />
          </div>
          </div>
        </div>
      </div>

      
    </footer>
    );
};

export default Footer;