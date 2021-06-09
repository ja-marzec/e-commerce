import React, { Component } from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Button, Typography } from "@material-ui/core";

export default function ProductsList() {
    const shop = useSelector(state => state.shop.shopItems.products)

    return (
      <Box mt={10} >
        <Typography variant="h4"> NASZE PRODUKCJE </Typography>
        <Box mt={4}>
        <Grid container justify="space-between" spacing={10} >
       {shop?.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))  }
        </Grid>
        </Box>
      </Box>
    );
  }
