import React, { Component } from "react";
import stripHtml from 'string-strip-html';
import { useSelector, useDispatch } from 'react-redux';
import { loadCartItems} from '../app/slice';
import { commerce } from '../lib/commerce';

export default function ProductItem(props) {
    const { product } = props
    const dispatch = useDispatch()



  function  handleAddToCart(productId, quantity) {
      commerce.cart.add(productId, quantity).then((item) => {
        dispatch(loadCartItems({cart: item.cart}))
        // this.setState({ cart: item.cart })
      }).catch((error) => {
        console.error('There was an error adding the item to the cart', error);
      });
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
          <div
      onClick={() => handleAddToCart(product.id, 1)}
          >
            ADD TO CART
          </div>
        </div>
      </div>
    );
  }

