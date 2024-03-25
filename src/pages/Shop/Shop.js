import React from 'react';
import CoffeeCard from '../../components/CoffeeCard';
import LeftBar from './LeftBar/LeftBar';
import styles from './Shop.module.css'
import SearchBar from './SearchBar/SearchBar';
import { useSelector } from 'react-redux';

const Shop = () => {
  const selectedProducts = useSelector(state => state.service.selectedProducts) || null
  if (selectedProducts !== null) {
    console.log(selectedProducts)
  }

  return (
    <div className='2xl:max-w-screen-2xl m-auto mt-8'>
      <div className='flex flex-wrap w-full'>
        <LeftBar />
        <div className='grid grid-cols-3 col-span-3 gap-5'>
          <SearchBar/>
          <>
            {
              selectedProducts !== null ? <div className={styles.container}>
                {
                  selectedProducts.map((card) => <CoffeeCard key={card.name} data={card} />)
                }
              </div> : <h1>Loading....</h1>
            }
          </>
        </div>
      </div>
    </div>
  );
};

export default Shop;
