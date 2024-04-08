import React from 'react'
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSelectedProducts } from '../../../store/slices/serviceDataSlice';
export default function SearchBar() {
  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.service.allProducts)
  const searchValue = useSelector(state => state.service.searchValue)
  function searchItem(value) {
    console.log(value)
    dispatch(setSearchValue(value))
    const a = allProducts.reduce((acc, product, index) => {
      const temp = product.name.split(' ')

      const bool = temp.filter((name) => {
        return !name.trim().toLowerCase().search(searchValue)
      })
      if (bool.length > 0) return [...acc, product]
      else {
        return acc
      }
    }, [])
    dispatch(setSelectedProducts(a))
    console.log(a)
  }
  return (
    <div className="p-2 col-span-3 flex justify-between my-3">
      {/* <Input icon={<MagnifyingGlassIcon className="h-5 w-5 hidden" />} className='hidden' />*/}
      <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} onInput={(e) => searchItem(e.target.value)} label="Поиск по товарам" />
    </div>
  )
}
