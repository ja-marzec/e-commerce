import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

export default function Cart () {
    const shop = useSelector(state => state.shop.cartItems)


    console.log(shop);

    

    function renderEmptyCart () {
        return (
            <div>
                cart is empty
            </div>
        )
    }

    function renderCartItems() {
      return  shop.cart?.line_items.map(item => {
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


    return (
        <div>
               { shop.cart?.line_items.length !== 0 
               ?  <div className="cart__container">
                    {renderCartItems()} 
                    </div>: renderEmptyCart()} 
        </div>

    )
}