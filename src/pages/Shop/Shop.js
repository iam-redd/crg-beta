import React from 'react';
import CoffeeCard from '../../components/CoffeeCard';
import LeftBar from './LeftBar/LeftBar';
import TeaCard from '../../components/TeaCard';
import styles from './Shop.module.css';
import SearchBar from './SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { DefaultSpinner } from '../../components/Spinner';

const Shop = () => {
  const selectedProducts = useSelector(state => state.service.selectedProducts) || null
  if (selectedProducts !== null) {
    console.log(selectedProducts)
  }

  return (
    <div className='w-full md:max-w-screen-xl 2xl:max-w-screen-2xl m-auto mt-8'>
      <div className=''>
        <SearchBar />
        <LeftBar />
        <div>
          <>
            {
              selectedProducts !== null ? <div className={styles.container}>
                {
                  selectedProducts.map((card) => <CoffeeCard key={card.name} data={card} />)
                }
              </div> : <div className="flex-center"><DefaultSpinner /></div>
            }
          </>
          
        </div>
        
      </div>
    </div>
  );
};

export default Shop;
