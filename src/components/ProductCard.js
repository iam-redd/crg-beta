import React from 'react'
import CoffeeCard from './CoffeeCard'
import TeaCard from './TeaCard'
export default function ProductCard({data}) {
    if(data.type === 'tea'){
        return <TeaCard data={data}/>
    }else{
        return <CoffeeCard data={data}/>
    }
}
