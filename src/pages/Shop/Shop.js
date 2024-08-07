import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar/LeftBar';
import styles from './Shop.module.css';
import SearchBar from './SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { DefaultSpinner } from '../../components/Spinner';
import ProductCard from '../../components/ProductCard';

const Shop = () => {
  const selectedProducts = useSelector(state => state.service.selectedProducts)
  const [data, setData] = useState(false)
  useEffect(() => {
    selectedProducts !== null && setData(true)
  }, [selectedProducts]);


  return (
    <div className='w-full md:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto my-8'>
      <div className=''>
        <SearchBar />
        <LeftBar />
        <div>
          <>
            {
              data ? <div className={styles.container}>
                {
                  selectedProducts.map((card,index) => <ProductCard key={card._id} data={card} />)
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
