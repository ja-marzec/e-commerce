import React, { useEffect, useState } from 'react';
import './App.scss';
import { commerce } from './lib/commerce';
import { useSelector, useDispatch } from 'react-redux';
import {loadCartItems, loadShopItems} from './app/slice';

import ProductsList from './components/ProductsList';
import Header from './components/Header';
import Cart from './components/Cart';
import Contact from './components/Contact';
import ItemPreview from './components/ItemPreview';
import AboutUs from './components/AboutUs';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Order from './components/Order';

function App() {
  const shop = useSelector(state => state.shop.shopItems)
  const preview = useSelector(state => state.shop.itemPreview)

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
     dispatch(loadCartItems(cart))
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
      <Router >
      <Header />
      <Switch>

          <Route exact path="/">
           <Home />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/itempreivew">
            <ItemPreview />
          </Route>

          <Route  path="/contact">
            <Contact />
          </Route>

          <Route  path="/aboutus">
            <AboutUs />
          </Route>

          <Route  path="/itempreview">
            <ItemPreview />
          </Route>
          <Route  path="/order">
            <Order />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
