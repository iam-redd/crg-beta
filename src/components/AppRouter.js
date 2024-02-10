import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { adminRoutes, publicRoutes, userRoutes, wholeSellerRoutes } from '../routes';
import { HOME_PAGE } from '../utils/consts';

const AppRouter = () => {

    const isUser = false
    const isWholeSeller = false
    const isAdmin = false

    return (
        <div>
            <Routes>
            {isUser && userRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {isAdmin && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {isWholeSeller && wholeSellerRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={HOME_PAGE} replace/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;