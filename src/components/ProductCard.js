import React from 'react'
import CoffeeCard from './CoffeeCard'
import TeaCard from './TeaCard'
import AnyCard from './AnyCard'
export default function ProductCard({data}) {
    if(data.type === 'tea'){
        return <TeaCard data={data}/>
    }else if(data.type === 'coffe-beans'){
        return <CoffeeCard data={data}/>
    }else{
        return <AnyCard data={data}/>
    }
}
