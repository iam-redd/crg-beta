import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { lazy } from "react";

const ShopUser = lazy(()=> import ( '../pages/Shop/Shop'))
const ShopWholeseller = lazy(()=> import ( '../pages/WS_Shop'))
const UserProfile = lazy(()=> import ( '../pages/UserProfile/UserProfile'))
const Login = lazy(()=> import ( '../pages/UserProfile/Login/LogIn'))
const Registration = lazy(()=> import ( '../pages/UserProfile/Registration/Registration'))
const Basket = lazy(()=> import ( '../pages/Basket/Basket'))
const WsBasket = lazy(()=> import ( '../pages/WS_Basket'))
const AboutPage = lazy(()=> import ( '../pages/About'))
const PayDelivery = lazy(()=> import ( '../pages/PayDelivery'))
const AboutCoffe = lazy(()=> import ( '../pages/AboutCoffee'))
const JsBarista = lazy(()=> import ( '../pages/JSBarista'))
const NotFound = lazy(()=> import ( '../pages/NotFound'))
const Monitoring = lazy(()=> import ( "../pages/admin/Monitoring/Monitoring"))
const CreatePost = lazy(()=> import ( "../pages/admin/CreatePost/CreatePost"))
const Settings = lazy(()=> import ( "../pages/admin/Settings/Settings"))
const AllUsers = lazy(()=> import ( "../pages/admin/AllUsers/AllUsers"))
const AllGoods = lazy(()=> import ( "../pages/admin/AllGoods/AllGoods.js"))
const User = lazy(() => import('../pages/admin/AllUsers/UserInfo/UserInfo.js'))
const AdminLayout = lazy(()=> import ( '../pages/admin/Layout/Layout'))
const Catalog = lazy(()=> import ( "../pages/admin/Catalog/Catalog"))
const MyOrders = lazy(()=> import ( '../pages/UserProfile/MyOrders/MyOrders'))
const MySettings = lazy(()=> import ( "../pages/UserProfile/UserSettings/UserSettings"))
const Main = lazy(() => import('../pages/Home/Home'))

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="shop" element={<ShopUser />} />
            <Route path="shop-wholeseller" element={<ShopWholeseller />} />
            <Route path="user" element={<UserProfile />} >
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="settings" element={<MySettings />} />
            </Route>
            <Route path="basket" element={<Basket />} />
            <Route path="wholeseller-basket" element={<WsBasket />} />
            <Route path="admin" element={<AdminLayout />} >
                <Route path="monitoring" element={<Monitoring />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="all-users" element={<AllUsers />} />
                <Route path="all-users/:id" element={<User />} />
                <Route path="settings" element={<Settings />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="all-goods" element={<AllGoods />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="pay-n-delivery" element={<PayDelivery />} />
            <Route path="about-coffe" element={<AboutCoffe />} />
            <Route path="barista-school" element={<JsBarista />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Route>

))

export default router;