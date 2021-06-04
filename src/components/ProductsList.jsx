import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Button, Typography } from "@material-ui/core";

export default function ProductsList() {
    const shop = useSelector(state => state.shop.shopItems.products)

    return (
      <div className="products__list">
        <Grid container spacing={-2} justify="center" alignItems="center">
       {shop?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))  }
        </Grid>

      </div>
    );
  }
