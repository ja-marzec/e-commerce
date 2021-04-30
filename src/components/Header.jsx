import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/cart.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Header() {

    const shop = useSelector(state => state.shop.cartItems)
    
    console.log("SHOP",shop);
    
    return (
            
        <nav className="header">

<div className="dummy"></div>
<div className="nav__holder">
<div className="nav__elem">  <Link to="/aboutus"> ABOUT US</Link> </div>
            <div className="nav__elem">
            <Link to="/">ELO KLAPERO</Link>
            </div>
<div className="nav__elem">  
             <Link to="/contact">KONTAKT</Link>
 </div>

        </div>
        
          <div className="cart">
          <Link to="/cart">
              <div className="cart__wrapper">
              <img  className="cart__icon" src={Logo}/>
              <div className="cart__circle">
                        <div className="cart__counter">
                        {shop.total_items}
                        </div>
              </div>
              </div>
              </Link>
          </div>

        </nav>
    )
}