import React from 'react';

import styles from './LeftBar.module.css'

export default function LeftBar() {
    const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  
    return (
        <div className='w-full mx-auto md:max-w-screen-xl p-4'>
            <div className='grid grid-flow-row grid-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            
                <div className={`p-5 ${styles.catcat}`}>
                Кофе
                </div>
                <div className={`p-5 ${styles.catcat}`}>
                Дрипы
                </div>
                <div className={`p-5 ${styles.catcat}`}>
                Капсулы
                </div>
                <div className={`p-5 ${styles.catcat}`}>
                Чай
                </div>
                <div className={`p-5 ${styles.catcat}`}>
                Аксессуары
                </div>
                <div className={`p-5 ${styles.catcat}`}>
                Химия
                </div>
               
            </div>
        </div>
    )
}
