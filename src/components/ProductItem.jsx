import React, { useEffect, useState } from "react";
import stripHtml from "string-strip-html";
import { useSelector, useDispatch } from "react-redux";
import { loadCartItems, openPreview } from "../app/slice";
import { commerce } from "../lib/commerce";
import { Grid, Box, Button, Typography } from "@material-ui/core";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function ProductItem(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop.cartItems);
  const [isItemInCart, setIsItemInCart] = useState(false);
  function isItemIncluded() {
    if (shop.line_items?.some((item) => item.product_id === product.id)) {
      return false;
    } else {
      return true;
    }
  }
  console.log(product);

  useEffect(() => {
    if (!isItemIncluded()) {
      setIsItemInCart(true);
    } else {
      setIsItemInCart(false);
    }
  }, [shop.line_items]);

  function handleAddToCart(productId, quantity) {
    if (isItemIncluded()) {
      commerce.cart
        .add(productId, quantity)
        .then((item) => {
          setIsItemInCart(true);
          dispatch(loadCartItems(item.cart));
        })
        .catch((error) => {
          console.error(
            "There was an error adding the item to the cart",
            error
          );
        });
    } else {
      return;
    }
  }
  function handleOpenPreview() {
    dispatch(openPreview({ open: true, product: product }));
  }

  return (
    <Grid item xs={12} md={6} >
      <div className="product__card" onClick={(e) => handleOpenPreview(e)}>
        <Link to="/itempreview">
          <img
            className="product__image"
            src={product.media.source}
            alt={product.name}
          />
        </Link>

        <div className="product__info">
          <Typography mt={6} variant="h6">
            {product.name}
          </Typography>
          {/* <p className="product__description">
            {product.description}
          </p> */}
          <div className="product__details">
            <p className="product__price">
              <Typography mt={6} variant="body2">
                {product.price.raw} zł{" "}
              </Typography>
            </p>
          </div>

          <Box mt={1}>
            {!isItemInCart ? (
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product.id, 1)}
              >
                MYK DO KOSZYKA
              </Button>
            ) : (
              <Button variant="contained" disabled>
                W KOSZYCZKU
              </Button>
            )}
          </Box>
        </div>
      </div>
    </Grid>
  );
}
