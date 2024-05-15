import axios from '../../store/axios'
import { addData } from '../../store/slices/userSlice';
import CryptoJS from 'crypto-js';
import secretKey from '../../default.json'
import UserHeader from './UserHeader/UserHeader';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
    const dispatch = useDispatch()
    async function getMe() {
        try {
          const res = await axios.get('/me')
          if (res.status === 200) {
            const str = JSON.stringify(res.data)
            const ciphertext = CryptoJS.AES.encrypt(str, secretKey.secretKey).toString();
            window.localStorage.setItem('data',JSON.stringify(ciphertext))
            dispatch(addData(res.data))
          }
        } catch (e) {
    
        }
      }
      getMe()
    return (
        
        <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-xl py-10 lg:py-2 sm:p-3'>
            <div className='flex justify-center'>
            </div>
            <div className=''>
                <UserHeader />
            </div>

        </div>
    );
};

export default UserProfile;