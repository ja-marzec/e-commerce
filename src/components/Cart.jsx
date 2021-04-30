import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { commerce } from '../lib/commerce';
import { loadCartItems} from '../app/slice';
export default function Cart () {
    const shop = useSelector(state => state.shop.cartItems)
    const dispatch = useDispatch()

    console.log("CART ",shop);

    

    function renderEmptyCart () {
        return (
            <div>
                cart is empty
            </div>
        )
    }

    function renderCartItems() {
      return  shop.line_items?.map(item => {
            return (
                <div>
                <CartItem
                item={item}
                key={item.id}
                className="cart__inner"
              />
                </div>

            )
        })
    }

    function cleanCart() {
        commerce.cart.empty().then((response) => {
            dispatch(loadCartItems(response.cart) )
            console.log(response)
        })
    }


    return (
        <div>
               { shop.cart?.line_items.length !== 0 
               ?  <div className="cart__container">
                    {renderCartItems()} 
                    </div>: renderEmptyCart()} 
                    <button onClick={() => cleanCart()}>CLEAN CART </button>
        </div>

    )
}