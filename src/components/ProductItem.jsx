import React, { useEffect, useState } from "react";
import stripHtml from 'string-strip-html';
import { useSelector, useDispatch } from 'react-redux';
import { loadCartItems} from '../app/slice';
import { commerce } from '../lib/commerce';

export default function ProductItem(props) {
    const { product } = props;
    console.log("PROPS",product);
    const dispatch = useDispatch()
    const shop = useSelector(state => state.shop.cartItems);
    const [isItemInCart, setIsItemInCart] = useState(false)
    

    useEffect(() => {
      if( isItemIncluded() ) {
        setIsItemInCart(true) 
      }
    },[])

    const isItemIncluded = () => {
      if (shop.cart?.line_items.some(item => ( item.product_id === product.id ))) {
        return false;
      } else {
       return true;
      }
    }


  function handleAddToCart(productId, quantity) {
    if(isItemIncluded()) {
      commerce.cart.add(productId, quantity).then((item) => {
        setIsItemInCart(true);
        dispatch(loadCartItems({cart: item.cart}))
      }).catch((error) => {
        console.error('There was an error adding the item to the cart', error);
      });
    } else {
      return 
    }
    }


    return (
      <div className="product__card"
      >
        <img className="product__image" src={product.media.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <p className="product__description">
            {/* product description stripped of html tags */}
            {product.description}
          </p>
          <div className="product__details">
            <p className="product__price">
            {product.price.formatted_with_symbol}
            </p>
          </div>
          {isItemInCart ?
         <button
         onClick={() => handleAddToCart(product.id, 1)}
         >
           ADD TO CART
         </button>
         :
         <div> W KOSZYKU </div>  
        }
        </div>
      </div>
    );
  }

