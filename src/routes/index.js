import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom"
import Layout from "../components/Layout/Layout"
import { lazy } from "react"
import MyOrders from '../pages/UserProfile/MyOrders/MyOrders'
import MySettings from "../pages/UserProfile/UserSettings/UserSettings"
import Monitoring from "../pages/admin/Monitoring/Monitoring"
import CreatePost from "../pages/admin/CreatePost/CreatePost"
import Settings from "../pages/admin/Settings/Settings"
import AllUsers from "../pages/admin/AllUsers/AllUsers"
import AllGoods from "../pages/admin/AllGoods/AllGoods.js"
import AdminLayout from '../pages/admin/Layout/Layout'
import Others from '../pages/others/Layout/Layout.js'
import Contacts from '../pages/others/Contacts'
import Wholesellers from '../pages/others/WS'
import AboutPage from '../pages/others/About.js'
import PayDelivery from '../pages/others/PayDelivery.js'
import ShopUser from '../pages/Shop/Shop'
import UserProfile from '../pages/UserProfile/UserProfile'
import User from '../pages/admin/AllUsers/UserInfo/UserInfo.js'

const Basket = lazy(() => import('../pages/Basket/Basket'))
const AboutCoffe = lazy(() => import('../pages/AboutCoffee'))
const JsBarista = lazy(() => import('../pages/JSBarista'))
const NotFound = lazy(() => import('../pages/NotFound'))
const Catalog = lazy(() => import("../pages/admin/Catalog/Catalog"))
const Admin = lazy(() => import('../components/Admin'))
const Main = lazy(() => import('../pages/Home/Home'))


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="shop" element={<ShopUser />} />
            <Route path="user" element={<UserProfile />} >
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="settings" element={<MySettings />} />
            </Route>
            <Route path="basket" element={<Basket />} />
            <Route path="about-coffe" element={<AboutCoffe />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/others" element={<Others />} >
                <Route path="pay-n-delivery" element={<PayDelivery />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="barista-school" element={<JsBarista />} />
                <Route path="wholesellers" element={<Wholesellers />} />
                <Route path="contacts" element={<Contacts />} />
            </Route>
        </Route>
        <Route path="/staff" element={<AdminLayout />} >
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="all-users" element={<div>Это страница на этапе разработки</div>} />
            <Route path="all-users/:id" element={<User />} />
            <Route path="settings" element={<Settings />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="all-goods" element={<AllGoods />} />
        </Route>
    </Route>

))

export default router;