import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { lazy } from "react";
import Admin from "../components/Admin";

import  ShopUser from '../pages/Shop/Shop'
import  Wholesellers from '../pages/others/WS'
import  UserProfile from '../pages/UserProfile/UserProfile'
import  Login from '../pages/UserProfile/Login/LogIn'
import  Registration from '../pages/UserProfile/Registration/Registration'
import  CodePage from '../pages/CodeVerify/CodePage'
import  Basket from '../pages/Basket/Basket'
import  AboutPage from '../pages/others/About.js'
import  PayDelivery from '../pages/others/PayDelivery.js'
import  AboutCoffe from '../pages/AboutCoffee'
import  JsBarista from '../pages/JSBarista'
import  NotFound from '../pages/NotFound'
import  Monitoring from "../pages/admin/Monitoring/Monitoring"
import  CreatePost from "../pages/admin/CreatePost/CreatePost"
import  Settings from "../pages/admin/Settings/Settings"
import  AllUsers from "../pages/admin/AllUsers/AllUsers"
import  AllGoods from "../pages/admin/AllGoods/AllGoods.js"
import  User from'../pages/admin/AllUsers/UserInfo/UserInfo.js'
import  AdminLayout from '../pages/admin/Layout/Layout'
import  Catalog from "../pages/admin/Catalog/Catalog"
import  MyOrders from '../pages/UserProfile/MyOrders/MyOrders'
import  MySettings from "../pages/UserProfile/UserSettings/UserSettings"
import  Main from '../pages/Home/Home'
import  Others from'../pages/others/Layout/Layout.js'
import  Contacts from'../pages/others/Contacts'


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="shop" element={<ShopUser />} />
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="verify-code" element={<CodePage/>} /> */}
            {/* <Route path="registration" element={<Registration />} /> */}
            <Route path="user" element={<UserProfile />} >
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="settings" element={<MySettings />} />
            </Route>
            <Route path="basket" element={<Basket />} />
            <Route path="admin" element={<Admin />} />
            <Route path="staff" element={<AdminLayout />} >
                <Route path="monitoring" element={<Monitoring />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="all-users" element={<AllUsers />} />zz
                <Route path="all-users/:id" element={<User />} />
                <Route path="settings" element={<Settings />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="all-goods" element={<AllGoods />} />
            </Route>
            <Route path="others" element={<Others />} >
                <Route path="payndelivery" element={<PayDelivery />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="barista-school" element={<JsBarista />} />
                <Route path="wholesellers" element={<Wholesellers />} />
                <Route path="contacts" element={<Contacts />} />
            </Route>
            <Route path="about-coffe" element={<AboutCoffe />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Route>

))

export default router;