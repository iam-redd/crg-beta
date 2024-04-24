import React from 'react';
import { Typography } from "@material-tailwind/react";

const Footer = () => {
    return (
      <footer className="mx-auto mb-5 lg:my-10 max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 lg:px-8 lg:py-4 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal text-xs">
        &copy; 2018 COFFEE ROASTERY GROUP
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 text-xs">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className=" text-xs font-normal transition-colors hover:text-red-500 focus:text-red-500"
          >
            О нас
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className=" text-xs font-normal transition-colors hover:text-red-500 focus:text-red-500"
          >
            Пользовательское соглашение
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className=" text-xs font-normal transition-colors hover:text-red-500 focus:text-red-500"
          >
            Оплата и доставка
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className=" text-xs font-normal transition-colors hover:text-red-500 focus:text-red-500"
          >
            Контакты
          </Typography>
        </li>
      </ul>
    </footer>
    );
};

export default Footer;