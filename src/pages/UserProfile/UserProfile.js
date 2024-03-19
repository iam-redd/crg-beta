
import UserHeader from './UserHeader/UserHeader';

const UserProfile = () => {

    return (
        
        <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-xl py-10'>
            <div className='flex justify-center'>
            Личный кабинет пользователя!
            </div>
            <div className=''>
                <UserHeader />
            </div>
                
        </div>

    );
};

export default UserProfile;