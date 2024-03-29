import React from 'react'
import CoffeeCard from './CoffeeCard'
import TeaCard from './TeaCard'
export default function ProductCard({data}) {
    if(data.type === 'coffe-beans'){
        return <CoffeeCard data={data}/>
    }else if(data.type === 'tea'){
        return <TeaCard data={data}/>
    }
}
