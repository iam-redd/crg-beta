import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/button.css'
import './styles/home.css'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from '@material-tailwind/react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter> {/*Базовый роутинг */}
      <ThemeProvider> {/*Material Tailwind Theme */}
        <div className="bg-white">
          <div className='border-b border-gray-200'>
            <div className='h-full mx-auto max-w-screen-xl 2xl:max-w-screen-2xl hidden nowrap  px-4 py-1 2xl:px-0 items-center justify-between text-gray-600 lg:flex lg:px-4 lg:py-2'>
              <div className='text-sm cursor-text ml-5'>
                Call-центр: +998(99)000-00-00
              </div>
              <ul className='flex text-xs'>
                <li className='cursor-pointer ml-5 hover:text-red-600'>О нас</li>
                <li className='cursor-pointer ml-5 hover:text-red-600'>Оплата и доставка</li>
                <li className='cursor-pointer ml-5 hover:text-red-600'>Опт</li>
                <li className='cursor-pointer ml-5 hover:text-red-600'>Контакты</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='sticky top-0 z-50'>
          <Header />
        </div>
        <AppRouter /> {/*Основной роутинг */}
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);