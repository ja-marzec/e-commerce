import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { commerce } from "../lib/commerce";
import { loadCartItems } from "../app/slice";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@material-ui/core";

export default function Cart() {
  const shop = useSelector((state) => state.shop.cartItems);
  const dispatch = useDispatch();

  console.log("CART ", shop);

  function renderEmptyCart() {
    return <div>cart is empty</div>;
  }

  function renderCartItems() {
    return shop.line_items?.map((item) => {
      return (
          <CartItem item={item} key={item.id} className="cart__inner" />
      );
    });
  }

  function cleanCart() {
    commerce.cart.empty().then((response) => {
      dispatch(loadCartItems(response.cart));
      console.log(response);
    });
  }

  return (
      <Box>
      {shop.cart?.line_items.length !== 0 ? (
        <Grid container justify="center" spacing={3}>{renderCartItems()}</Grid>
      ) : (
        renderEmptyCart()
      )}
      <Box mt={3} >
          <Grid justify="center">

      {/* <Button variant="contained" onClick={() => cleanCart()}>WYCZYŚĆ KOSZYK </Button> */}
      <Link to="/order" >
          <Button ml={3} variant="contained" color="primary" > ZAMÓW! </Button>
      </Link>
      </Grid>
      </Box>

      </Box>
  );
}
