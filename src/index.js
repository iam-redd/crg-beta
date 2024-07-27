import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/button.css'
import './styles/home.css'
import './styles/card.css'
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux'
import { store } from './store'
import { RouterProvider } from 'react-router-dom';
import router from './routes/index'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}> {/*Базовый роутинг */}
      <ThemeProvider> {/*Material Tailwind Theme */}
      </ThemeProvider>
    </RouterProvider>
  </Provider>
);