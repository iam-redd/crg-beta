import React, { useEffect, useState } from 'react';
import LeftBar from './LeftBar/LeftBar';
import styles from './Shop.module.css';
import SearchBar from './SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { DefaultSpinner } from '../../components/Spinner';
import ProductCard from '../../components/ProductCard';


const Shop = () => {
  const selectedProducts = useSelector(state => state.service.selectedProducts)
  const [data, setData] = useState(null)
  console.log(data)


  useEffect(() => {
    data === null && setData(selectedProducts)
  });

  return (
    <div className='w-full md:max-w-screen-xl 2xl:max-w-screen-2xl m-auto mt-8'>
      <div className=''>
        <SearchBar />
        <LeftBar data={selectedProducts} setData={setData} />
        <div>
          <>
            {
              data !== null ? <div className={styles.container}>
                {
                  data.map((card) => <ProductCard key={card.name} data={card} />)
                }
              </div> : <div className="flex-center"><DefaultSpinner /></div>
            }
          </>

        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Shop;
