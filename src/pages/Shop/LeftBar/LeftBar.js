import React from 'react';

import styles from './LeftBar.module.css'

import beansIcon from '../../../assets/icons/beans.png'
import dripIcon from '../../../assets/icons/coffee-drip.png'
import syrupIcon from '../../../assets/icons/syrup.png'
import capsuleIcon from '../../../assets/icons/capsule.png'
import accessorieIcon from '../../../assets/icons/coffee-grinder.png'
import chemieIcon from '../../../assets/icons/clean.png'
import teaIcon from '../../../assets/icons/tea.png'


export default function LeftBar({ data, setData }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const filter = (value) => {
    setData(data.filter(product => product.type === value))
  }

  return (
    <div className={`${styles.catcatBck} w-full mx-auto md:max-w-screen-xl p-4 wrappeR`}>
      <div className='flex overflow-x-scroll scroll-smooth wrappeR'>

        <div
          className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
          onClick={() => filter('coffe-beans')}>
          <img src={beansIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Кофе
          </div>
        </div>
        <div className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}>
          <img src={dripIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Дрипы
          </div>
        </div>
        <div 
        className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
        onClick={()=> filter('coffee-capsule')}>
          <img src={capsuleIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Капсулы
          </div>
        </div>

        <div 
        className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
        onClick={()=> filter('tea')}>
          <img src={teaIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Чай
          </div>
        </div>
        <div 
        className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
        onClick={()=> filter('syrup')}>
          <img src={syrupIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Сиропы
          </div>
        </div>

        <div 
        className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
        onClick={()=> filter('accessories')}>
          <img src={accessorieIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Аксессуары
          </div>
        </div>

        <div 
        className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
        onClick={()=> filter('chemistry')}>
          <img src={chemieIcon} className='w-8 h-8 text-center' alt='' />
          <div>
            Химия
          </div>
        </div>
      </div>
    </div>
  )
}
