import React from 'react'
import url from '../../../../default.json'
import styles from './Card.module.css'
export default function Card({name,image}) {
  return (

    <div className={styles.wrapper}>
        <p>{name}</p>
        <img src={`${process.env.REACT_APP_SERVER}/${image}`} alt="" />
    </div>
  )
}
