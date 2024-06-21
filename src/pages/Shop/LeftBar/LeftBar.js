import React, { useState } from 'react';

import styles from './LeftBar.module.css'

import beansIcon from '../../../assets/icons/beans.png'
import allGoods from '../../../assets/icons/all.png'
import dripIcon from '../../../assets/icons/coffee-drip.png'
import syrupIcon from '../../../assets/icons/syrup.png'
import capsuleIcon from '../../../assets/icons/capsule.png'
import accessorieIcon from '../../../assets/icons/coffee-grinder.png'
import chemieIcon from '../../../assets/icons/clean.png'
import teaIcon from '../../../assets/icons/tea.png'
import { useDispatch, useSelector } from 'react-redux';
import { cancelSelectedProducts } from '../../../store/slices/serviceDataSlice';


export default function LeftBar() {
  const dispatch = useDispatch()
  const [tabActive, setTabActive] = useState(null)
  const allProducts = useSelector(state => state.service.allProducts)
  const selectedProducts = useSelector(state => state.service.selectedProducts)

  const filter = (value) => {
    console.log(value)
    if (value === null) {
      dispatch(cancelSelectedProducts(allProducts))
      setTabActive(value)
    } else {
      const temp = allProducts.filter(product => product.type === value)
      dispatch(cancelSelectedProducts(temp))
      setTabActive(value)
    }
  }

  return (
    <div className={`${styles.catcatBck} w-full mx-auto 2xl:mx-0 md:max-w-screen-xl p-4 m-4 wrappeR`}>
      <div className='flex overflow-x-scroll scroll-smooth lg:wrappeR 2xl:w-max pb-4'>
        <div

          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === null && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter(null) : null}>
          <img src={allGoods} className='w-8 h-8 text-center' alt='' />
          <div>
            Все
          </div>
        </div>
        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'coffe-beans' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('coffe-beans') : null}>
          <img src={beansIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Кофе
          </div>
        </div>
        <div className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'drip' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('drip') : null}>
          <img src={dripIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Дрипы
          </div>
        </div>
        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'coffee-capsule' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('coffee-capsule') : null}>
          <img src={capsuleIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Капсулы
          </div>
        </div>

        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'tea' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('tea') : null}>
          <img src={teaIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Чай
          </div>
        </div>
        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'syrup' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('syrup') : null}>
          <img src={syrupIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Сиропы
          </div>
        </div>

        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'accessories' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('accessory') : null}
        >
          <img src={accessorieIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Аксессуары
          </div>
        </div>
        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat} ${tabActive === 'chemistry' && styles.tabActive}`}
          onClick={() => selectedProducts !== null ? filter('chemistry') : null}>
          <img src={chemieIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Химия
          </div>
        </div>
      </div>
    </div>
  )
}
