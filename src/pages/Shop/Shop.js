
import React from 'react';
import CoffeeCard from '../../components/CoffeeCard';
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LeftBar from './LeftBar/LeftBar';
import { useGetAllGoodsQuery } from '../../store/goodsApi';

const Shop = () => {
  const { data, isSuccess } = useGetAllGoodsQuery()
  if (isSuccess) {
    console.log(data)
  }

  return (
    <div className='2xl:max-w-screen-2xl m-auto mt-8'>
      <div className='grid grid-cols-4 '>
        <LeftBar />

        <div className='grid grid-cols-3 col-span-3 gap-5'>
          <div className="p-2 col-span-3 flex justify-between">
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5 hidden" />} className='hidden' />
            <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Поиск по товарам" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;