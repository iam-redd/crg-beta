import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Layout from "../components/Layout/Layout";

import Others from "../pages/others/Layout/Layout"

import { lazy } from "react";
import MyOrders from '../pages/UserProfile/MyOrders/MyOrders'
import MySettings from "../pages/UserProfile/UserSettings/UserSettings"
import Monitoring from "../pages/admin/Monitoring/Monitoring"
import CreatePost from "../pages/admin/CreatePost/CreatePost"
import Settings from "../pages/admin/Settings/Settings"
import AllUsers from "../pages/admin/AllUsers/AllUsers"
import AllGoods from "../pages/admin/AllGoods/AllGoods.js"
import AdminLayout from '../pages/admin/Layout/Layout'
import Policy from "../pages/others/Policy";
import Public from "../pages/others/Public";

import AboutPage from "../pages/others/About"
import PayDelivery from "../pages/others/PayDelivery"
import Contacts from "../pages/others/Contacts"
import Wholesellers from "../pages/others/WS"


const ShopUser = lazy(() => import('../pages/Shop/Shop'))
// const Wholesellers = lazy(() => import('../pages/others/WS'))
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'))

const Basket = lazy(() => import('../pages/Basket/Basket'))
// const AboutPage = lazy(() => import('../pages/others/About.js'))
// const PayDelivery = lazy(() => import('../pages/others/PayDelivery.js'))
const AboutCoffe = lazy(() => import('../pages/AboutCoffee'))
const JsBarista = lazy(() => import('../pages/JSBarista'))
const NotFound = lazy(() => import('../pages/NotFound'))
// const Monitoring = lazy(() => import("../pages/admin/Monitoring/Monitoring"))
// const CreatePost = lazy(() => import("../pages/admin/CreatePost/CreatePost"))
// const Settings = lazy(() => import("../pages/admin/Settings/Settings"))
// const AllUsers = lazy(() => import("../pages/admin/Test/Test.js"))
// const AllGoods = lazy(() => import("../pages/admin/AllGoods/AllGoods.js"))
const User = lazy(() => import('../pages/admin/AllUsers/UserInfo/UserInfo.js'))
// const AdminLayout = lazy(() => import('../pages/admin/Layout/Layout'))
const Catalog = lazy(() => import("../pages/admin/Catalog/Catalog"))
const Admin = lazy(() => import('../components/Admin'))

const Main = lazy(() => import('../pages/Home/Home'))
// const Others = lazy(() => import('../pages/others/Layout/Layout.js'))
// const Contacts = lazy(() => import('../pages/others/Contacts'))


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="shop" element={<ShopUser />} />
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="verify-code" element={<CodePage/>} /> */}
            {/* <Route path="registration" element={<Registration />} /> */}
            <Route path="user" element={<UserProfile />} >
                {/* <Suspense fall back={<DefaultSpinner/>}> */}
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="settings" element={<MySettings />} />
                {/* </Suspense> */}
            </Route>
            <Route path="basket" element={<Basket />} />
            <Route path="others" element={<Others />} >
                <Route path="payndelivery" element={<PayDelivery />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="barista-school" element={<JsBarista />} />
                <Route path="wholesellers" element={<Wholesellers />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="privacypolicy" element={<Policy />} />
                <Route path="publicoffer" element={<Public />} />
            </Route>
            <Route path="about-coffe" element={<AboutCoffe />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="staff" element={<AdminLayout />} >
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