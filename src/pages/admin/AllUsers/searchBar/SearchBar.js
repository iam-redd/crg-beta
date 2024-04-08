import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Input } from '@material-tailwind/react'
import React from 'react'
import beansIcon from '../../../../assets/icons/beans.png'
import dripIcon from '../../../../assets/icons/coffee-drip.png'
import styles from '../../../Shop/LeftBar/LeftBar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSelectedUsers, setSelectedUsers, setSelectedValue } from '../../../../store/slices/forAdmin'
export default function SearchBar() {
    const allUsers = useSelector(state => state.forAdmin.allUsers)
    const searchValue = useSelector(state => state.forAdmin.selectedValue)
    // const selectedUsers = useSelector(state => state.forAdmin.selectedUsers)
    const dispatch = useDispatch()
    function filter(value = '') {
        console.log(value)
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
        const template = allUsers.filter((user, index) => {
            let str = user.phoneNumber.split('')
            str[0] === '+' ?str = str.slice(1, str.length).join('') : str = str.join('')
            return !str.search(temp)
        })
        dispatch(setSelectedUsers(template))
    }

    return (
        <>
            <div className="p-2 col-span-3 flex justify-between my-3">
                <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} onInput={(e) => searchItem(e.target.value)} label="Искать пользователя по телефону" />
            </div>
            <div className='flex overflow-x-scroll scroll-smooth wrappeR'>
                <div
                    className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
                    onClick={() => filter()}
                >
                    <img src={beansIcon} className='w-8 h-8 text-center' alt='' />
                    <div>
                        Все
                    </div>
                </div>
                <div
                    className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
                    onClick={() => filter('superUser')}
                >
                    <img src={beansIcon} className='w-8 h-8 text-center' alt='' />
                    <div>
                        Оптовики
                    </div>
                </div>
                <div className={`p-5 mb-1 mr-1 flex flex-col items-center ${styles.catcat}`}
                    onClick={() => filter('user')}>
                    <img src={dripIcon} className='w-8 h-8 text-center' alt='' />
                    <div>
                        Розничные
                    </div>
                </div>
            </div>
        </>
    )
}
