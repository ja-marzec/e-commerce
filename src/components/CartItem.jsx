import { useSelector, useDispatch } from 'react-redux';
import { commerce } from '../lib/commerce';
import { loadCartItems} from '../app/slice';

export default function CartItem(props) {
      const { item } = props;
      const dispatch = useDispatch()
  
      function removeItem() {
        commerce.cart.remove(item.id).then((res) =>
        dispatch(loadCartItems(res.cart))
        );
      }

      return (
        <div className="cart-item">
          <img className="cart-item__image" src={item.media.source} alt={item.name} />
          <div className="cart-item__details">
            <h4 className="cart-item__details-name">{item.name}</h4>
            <div className="cart-item__details-qty">
              {/* <button type="button" title="Reduce quantity">-</button>
              <p>qua: {item.quantity}</p>
              <button type="button" title="Increase quantity">+</button> */}
            </div>
            <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
          </div>
          <button type="button" onClick={() => removeItem()}>Remove</button>
        </div>
      );
    };