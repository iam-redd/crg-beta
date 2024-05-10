import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input, Button, ButtonGroup, Typography } from '@material-tailwind/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUsers } from '../../../../store/slices/forAdmin'
export default function SearchBar() {
    const allUsers = useSelector(state => state.forAdmin.allUsers)
    const dispatch = useDispatch()
    function filter(value = '') {
        if (value === '') {
            dispatch(setSelectedUsers(allUsers))
        } else {
            const template = allUsers.filter(user => user.role === value)
            dispatch(setSelectedUsers(template))
        }
    }
    
    function searchItem(value) {
        if (value === '') dispatch(setSelectedUsers(allUsers))
        let temp = value.split('')
        temp[0] === '+' ? temp = temp.splice(1, temp.length).join('') : temp = temp.join('')
        console.log(temp)
        const template = allUsers.filter((user, index) => {
            let str = user.phoneNumber.split('')
            str[0] === '+' ? str = str.slice(1, str.length).join('') : str = str.join('')
            return !str.search(temp)
        })
        dispatch(setSelectedUsers(template))
    }

    return (
        <>

            <div className='flex flex-col items-center sm:flex-row gap-1 mb-2 justify-center md:justify-between md:mx-5'>
                <div className='flex items-center gap-2'>
                    <Typography className='text-sm flex w-min'>Сортировка:</Typography>
                    <ButtonGroup variant='text' ripple={true} className='flex-col sm:flex-row justify-center md:justify-normal'>


                        <Button
                            onClick={() => filter()}
                        >
                            Все
                        </Button>

                        <Button
                            onClick={() => filter('superUser')}
                        >
                            ОПТ
                        </Button>

                        <Button
                            onClick={() => filter('user')}
                        >
                            Розница
                        </Button>
                    </ButtonGroup>
                </div>
                <div className='w-72 mx-auto sm:mx-0'>
                    <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} onInput={(e) => searchItem(e.target.value)} label="Поиск по номеру телефона" />
                </div>
            </div>
        </>
    )
}
