import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/cart.png'
export default function Header() {

    const shop = useSelector(state => state.shop.cartItems.cart)

    return (
        <nav className="header">

<div className="dummy"></div>
<div className="nav__holder">
<div className="nav__elem"> O NAS </div>
            <div className="nav__elem">
            ELO KLAPERO
            </div>
<div className="nav__elem"> KONTAKT </div>

        </div>
        
          <div className="cart">
              <div className="cart__wrapper">
              <img  className="cart__icon" src={Logo}/>
              <div className="cart__circle">
                        <div className="cart__counter">
                        {shop?.total_unique_items}
                        </div>
              </div>
              </div>
          </div>

        </nav>
    )
}