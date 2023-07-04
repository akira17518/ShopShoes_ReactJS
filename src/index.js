import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Redux/configStore';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css'
import HomeTemplate from './Template/HomeTemplate';
import { createBrowserHistory } from 'history'
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import Order from './pages/Order';
import Favourite from './pages/Favourite';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Like } from './pages/Like';
import SearchProduct from './pages/SearchProduct';
import Loading from './HOC/Loading';

export const customNavigate = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={customNavigate}>
      <Routes>
        <Route path='' element={<HomeTemplate></HomeTemplate>}>
          <Route index element={<Home></Home>}></Route>
          <Route path='/productdetail' element={<ProductDetail></ProductDetail>}>
            <Route path=':id' element={<ProductDetail />}></Route>
          </Route>
          <Route path='/search' element={<SearchProduct></SearchProduct>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/like' element={<Like></Like>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/update' element={<UpdateProfile></UpdateProfile>}></Route>
          <Route path='/order' element={<Order></Order>}></Route>
          <Route path='/favourite' element={<Favourite></Favourite>}></Route>
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
      <Loading></Loading>
    </HistoryRouter>
  </Provider>
);


