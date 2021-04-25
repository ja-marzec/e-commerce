import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';


export default function ProductsList() {
    const shop = useSelector(state => state.shop.shopItems.products)

    return (
      <div className="products__list">
       {shop?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))  }
      </div>
    );
  }
