import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { commerce } from './lib/commerce';
import { useStore } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {loadCartItems, loadShopItems} from './app/slice';
import ProductsList from './components/ProductsList';
import Header from './components/Header';
import Cart from './components/Cart';

function App() {
  const shop = useSelector(state => state.shop.shopItems)
  const dispatch = useDispatch()
  const [app, setApp] = useState({});

  function fetchProducts() {
    commerce.products.list().then((products) => {
      // setApp({ products: products.data });
      dispatch(loadShopItems({ products: products.data }));
    }).catch((error) => {
      console.log('There was an error fetching the products', error);
    });
  }

  function fetchCart() {
    commerce.cart.retrieve().then((cart) => {
     dispatch(loadCartItems({cart}))
    }).catch((error) => {
      console.error('There was an error fetching the cart', error);
    });
  }

  useEffect(() => {
      fetchProducts();
      fetchCart();
  },[])

  return (
    <div className="App">
      <Header />
      <div className="page__body">
      <ProductsList />
      </div>

     <Cart />
    </div>
  );
}

export default App;
