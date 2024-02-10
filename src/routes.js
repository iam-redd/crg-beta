import About from "./pages/About"
import AboutCoffee from "./pages/AboutCoffee"
import Admin from "./pages/Admin"
import Basket from "./pages/Basket"
import Home from "./pages/Home"
import JSBarista from "./pages/JSBarista"
import LogIn from "./pages/LogIn"
import PayNDelivery from "./pages/PayNDelivery"
import Recipes from "./pages/Recipes"
import Registration from "./pages/Registration"
import Shop from "./pages/Shop"
import UserProfile from "./pages/UserProfile"
import WS_Basket from "./pages/WS_Basket"
import WS_Shop from "./pages/WS_Shop"
import WholeSellerProfile from "./pages/WholeSellerProfile"
import { ABOUT_COFFEE, ABOUT_PAGE, ADMIN, BASKET, HOME_PAGE, JS_BARISTA, LOG_IN, PAY_DELIVERY, RECIPES, REGISTRATION, SHOP_USER, SHOP_WHOLESELLER, USER_PROFILE, WHOLESELLER_PROFILE, WS_BASKET } from "./utils/consts"

export const userRoutes = [
    {
        path: HOME_PAGE,
        Component: Home
    },
    {
        path: SHOP_USER,
        Component: Shop
    },
    {
        path: BASKET,
        Component: Basket
    },
    {
        path: LOG_IN,
        Component: LogIn
    },
    {
        path: REGISTRATION,
        Component: Registration
    },
    {
        path: PAY_DELIVERY,
        Component: PayNDelivery
    },
    {
        path: JS_BARISTA,
        Component: JSBarista
    },
    {
        path: ABOUT_PAGE,
        Component: About
    },
    {
        path: ABOUT_COFFEE,
        Component: AboutCoffee
    },
    {
        path: RECIPES,
        Component: Recipes
    },
    {
        path: USER_PROFILE,
        Component: UserProfile
    },
]

export const wholeSellerRoutes = [
    {
        path: HOME_PAGE,
        Component: Home
    },
    {
        path: SHOP_WHOLESELLER,
        Component: WS_Shop
    },
    {
        path: WS_BASKET,
        Component: WS_Basket
    },
    {
        path: LOG_IN,
        Component: LogIn
    },
    {
        path: REGISTRATION,
        Component: Registration
    },
    {
        path: PAY_DELIVERY,
        Component: PayNDelivery
    },
    {
        path: JS_BARISTA,
        Component: JSBarista
    },
    {
        path: ABOUT_PAGE,
        Component: About
    },
    {
        path: ABOUT_COFFEE,
        Component: AboutCoffee
    },
    {
        path: RECIPES,
        Component: Recipes
    },
    {
        path: WHOLESELLER_PROFILE,
        Component: WholeSellerProfile
    },
    
]

export const adminRoutes = [
    {
        path: ADMIN,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: HOME_PAGE,
        Component: Home
    },
    {
        path: SHOP_USER,
        Component: Shop
    },
    {
        path: BASKET,
        Component: Basket
    },
    {
        path: LOG_IN,
        Component: LogIn
    },
    {
        path: REGISTRATION,
        Component: Registration
    },
    {
        path: PAY_DELIVERY,
        Component: PayNDelivery
    },
    {
        path: JS_BARISTA,
        Component: JSBarista
    },
    {
        path: ABOUT_PAGE,
        Component: About
    },
    {
        path: ABOUT_COFFEE,
        Component: AboutCoffee
    },
    {
        path: RECIPES,
        Component: Recipes
    },
    {
        path: USER_PROFILE,
        Component: UserProfile
    },
]