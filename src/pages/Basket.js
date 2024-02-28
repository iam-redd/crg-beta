import React from 'react';
import {useSelector} from 'react-redux'
const Basket = () => {
    const basket = useSelector(state => state.basket.basket)
    console.log(basket)
    return (
        <div>
            Basket
        </div>
    );
};

export default Basket;