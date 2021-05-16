import { loadCartItems, openPreview} from '../app/slice';
import { useSelector, useDispatch } from 'react-redux';
import {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { commerce } from '../lib/commerce';

export default function ItemPreview() {
  const dispatch = useDispatch();

    const product = useSelector(state => state.shop.itemPreview.product)
    const shop = useSelector(state => state.shop.cartItems)

    const [isItemInCart, setIsItemInCart] = useState(false);

    function isItemIncluded () {
      if (shop.line_items?.some(item => ( item.product_id === product.id ))) {
        return false;
      } else {
       return true;
      }
    }

    useEffect(() => {
      if(!isItemIncluded()) {
        setIsItemInCart(true)
      } else {
        setIsItemInCart(false)
      }
},[shop.line_items]);

function handleAddToCart(productId, quantity) {
  if(isItemIncluded()) {
    commerce.cart.add(productId, quantity).then((item) => {
      setIsItemInCart(true);
      dispatch(loadCartItems( item.cart ))
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  } else {
    return 
  }
  }

    function closeItemPreview() {
        dispatch(openPreview({open: false, product: {}}))
    }

    return (
    <div>
         <div className="preview__item"
      >
        <img className="product__image" src={product.media?.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <div className="product__details">
        <p className="product__description">
            {product.description}
          </p>
            <p className="product__price">
         CENA:    {product.price?.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
      {!isItemInCart ?
         <button
         onClick={() => handleAddToCart(product.id, 1)}
         >
           ADD TO CART
         </button>
         :
         <div> W KOSZYKU </div>  
        }
      <button onClick={() => closeItemPreview() }>  <Link to="/"> CLOSE </Link>  </button>
    </div>
    )
}