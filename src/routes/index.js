import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Main from '../pages/Home/Home'
import ShopUser from '../pages/Shop/Shop'
import ShopWholeseller from '../pages/WS_Shop'
import UserProfile from '../pages/UserProfile/UserProfile'
import Login from '../pages/Login/LogIn'
import Registration from '../pages/Registration/Registration'
import Basket from '../pages/Basket'
import WsBasket from '../pages/WS_Basket'
import Admin from '../pages/admin/Admin'
import AboutPage from '../pages/About'
import PayDelivery from '../pages/PayDelivery'
import AboutCoffe from '../pages/AboutCoffee'
import JsBarista from '../pages/JSBarista'
import NotFound from '../pages/NotFound'
const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            `<Route path="shop" element={<ShopUser />} />
            <Route path="shop-wholeseller" element={<ShopWholeseller />} />
            <Route path="user" element={<UserProfile />} />
            <Route path="user/login" element={<Login />} />
            <Route path="user/registration" element={<Registration />} />
            <Route path="basket" element={<Basket />} />
            <Route path="wholeseller-basket" element={<WsBasket />} />
            <Route path="admin" element={<Admin />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="pay-n-delivery" element={<PayDelivery />} />
            <Route path="about-coffe" element={<AboutCoffe />} />
            <Route path="barista-school" element={<JsBarista />} />
            <Route path="*" element={<NotFound />} />`
        </Route>
    </Route>

))

export default router;