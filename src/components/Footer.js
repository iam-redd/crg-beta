import React from 'react';
import { Typography } from "@material-tailwind/react";

import facebookIcon from "../assets/icons/facebook.png";
import telegramIcon from "../assets/icons/telegram-logo.png";
import instagramIcon from "../assets/icons/instagram-logo.png";

import logoIcon from '../assets/icons/Coffee_Roastery_logo.svg'
import YMap from './YMap';

import { Dropdown } from "flowbite-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { JS_BARISTA } from "../utils/consts";
import { useDispatch, useSelector } from 'react-redux';
import { cancelSelectedProducts } from '../store/slices/serviceDataSlice';
//import {Link} from 'react-router-dom'

const LINKS = [
  {
    title: "Страницы",
    items: [
      { name: "Главная", link: "/" },
      { name: "Магазин", link: "/shop", key: null },
      { nsme: "Школа бариста", link: "/barista-school" }],
  },
  {
    title: "Каталог",
    items: [
      { name: "Кофе", link: '/shop', key: 'coffe-beans' },
      { name: "Чаи", link: '/shop', key: 'tea' },
      { name: "Сиропы", link: '/shop', key: 'syrup' },
      { name: "Химия", link: '/shop', key: 'chemistry' },
      { name: "Капсулы", link: "/shop", key: 'coffee-capsule' },
      { name: "Аксессуары", link: "/shop", key: 'accessory' }],
  },
  {
    title: "Прочее",
    items: [
      { name: "О нас", link: "/others/about" },
      { name: "Оплата и доставка", link: "/others/pay-n-delivery" },
      { name: "ОПТ", link: "/others/wholesellers" },
      { name: "Контакты", link: "/others/contacts" },]
  },
];



const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.service.allProducts)
  const selectedProducts = useSelector(state => state.service.selectedProducts)
  function masterNavigate(link) {
    if (location.pathname === '/shop') {
      if (link.link === '/shop') {
        const temp = allProducts.filter(product => product.type === link.key)
        dispatch(cancelSelectedProducts(temp))
      } else {
        navigate(link.link, { state: link?.key ? link.key : null })
      }
    } else {
      navigate(link.link, { state: link?.key ? link.key : null })
    }
  }
  return (
    <footer className="bg-gray-100 pb-5 max-w-screen-full rounded-none px-4 2xl:px-0 lg:px-8 lg:py-4 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">

      <div className='hidden md:flex w-full flex-wrap lg:flex-nowrap'>
        <div className='flex flex-wrap md:flex-nowrap mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 justify-between gap-2 text-start text-xs">
            <div className='mr-4'>
              <div className='flex'>
                <div className='mr-2'>
                  <img width={70} src={logoIcon} alt='logo' />
                </div>
                <div className='w-16'>
                  <p className='font-bold leading-none'>COFFEE ROASTERY GROUP</p>
                  <div className='flex mt-2 gap-2'>
                    <a href='https://www.instagram.com/coffeeroasterygroup/' title='Instagram' target='_blank'
                      rel='noreferrer'><img width={18} src={instagramIcon} alt='' /></a>
                    <a href='https://t.me/CoffeeRoasteryGroup_bot' title='Telegram' target='_blank'
                      rel='noreferrer'><img width={18} src={telegramIcon} alt='' /></a>
                    <a href='https://www.facebook.com/people/Coffee-Roastery-Group/100089262537599/?mibextid=LQQJ4d'
                      title='Facebook' target='_blank' rel='noreferrer'><img width={18} src={facebookIcon} alt='' /></a>
                  </div>
                </div>
              </div>
              <p className="font-normal text-xs mt-4">
                &copy; 2019 COFFEE ROASTERY GROUP
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
                {items.map((link, index) => (
                  <li
                    onClick={() => masterNavigate(link)}
                    key={index * 5} className="text-xs py-1 font-normal transition-colors hover:text-red-400">
                    <Typography
                      color="gray"
                    >
                      {link.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}

          </div>
          <div className='h-48 overflow-hidden'>
            <a href='https://yandex.uz/maps/-/CDbD505E' target='_blank' rel='noreferrer'><p
              className='text-xs font-medium mb-2 opacity-70 hover:text-red-400'>г.Ташкент, Шайхантахурский
              район, Кончилик 37</p></a>
            <div>
              <YMap />
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full px-3 md:hidden'>
        <div className='flex flex-col w-full'>
          <div className='flex w-full items-center'>
            <div className='flex w-full'>
              <div className='mr-2'>
                <img width={54} src={logoIcon} alt='logo' />
              </div>
              <div className='w-12'>
                <p className='font-bold leading-none text-xs'>COFFEE ROASTERY GROUP</p>
                <div className='flex mt-2 gap-2'>
                  <a href='https://www.instagram.com/coffeeroasterygroup/' title='Instagram' target='_blank'
                    rel='noreferrer'><img width={15} src={instagramIcon} alt='' /></a>
                  <a href='https://t.me/CoffeeRoasteryGroup_bot' title='Telegram' target='_blank'
                    rel='noreferrer'><img
                      width={15} src={telegramIcon} alt='' /></a>
                  <a href='https://www.facebook.com/people/Coffee-Roastery-Group/100089262537599/?mibextid=LQQJ4d'
                    title='Facebook' target='_blank' rel='noreferrer'><img width={15} src={facebookIcon} alt='' /></a>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-end'>
              <div className='flex flex-col gap-2 text-md text-center justify-center'>
                <Dropdown placement='auto' size='lg' label="Страницы" inline>
                  <Dropdown.Item>Главная</Dropdown.Item>
                  <Dropdown.Item>Магазин</Dropdown.Item>
                  <Dropdown.Item>Школа бариста</Dropdown.Item>
                  <Dropdown.Item>Личный кабинет</Dropdown.Item>
                  {/*<Dropdown.Item>Рецепты</Dropdown.Item>*/}
                  {/*<Dropdown.Item>Энциклопедия</Dropdown.Item>*/}
                </Dropdown>
                <Dropdown placement='auto' size='lg' label="Каталог" inline>
                  <Dropdown.Item>Кофе</Dropdown.Item>
                  <Dropdown.Item>Чаи</Dropdown.Item>
                  <Dropdown.Item>Сиропы</Dropdown.Item>
                  <Dropdown.Item>Химия</Dropdown.Item>
                  <Dropdown.Item>Аксессуары</Dropdown.Item>
                </Dropdown>
                <Dropdown placement='auto' size='lg' label="Прочее" inline>
                  <Link to={'/others/about'} ><Dropdown.Item>О нас</Dropdown.Item></Link>
                  <Link to={'/others/payndelivery'}><Dropdown.Item>Оплата и доставка</Dropdown.Item></Link>
                  <Link to={'others/contacts'}><Dropdown.Item>Контакты</Dropdown.Item></Link>
                  <Link to={'/others/privacypolicy'}><Dropdown.Item>Политика конфеденциальеости</Dropdown.Item></Link>
                  <Link to={'/others/publicoffer'}><Dropdown.Item>Публичная оферта</Dropdown.Item></Link>
                </Dropdown>
              </div>

            </div>

          </div>
          <p className="font-normal text-xs mt-4">
            &copy; 2019 COFFEE ROASTERY GROUP
          </p>


        </div>

      </div>


    </footer>
  );
};

export default Footer;