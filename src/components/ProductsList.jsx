import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';

export default function ProductsList() {
    const shop = useSelector(state => state.shop.shopItems.products)

    return (
      <div className="products__list">
        <Grid container spacing={3}>
       
        </Grid>
       {shop?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))  }
      </div>
    );
  }
