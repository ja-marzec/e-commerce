import { useSelector, useDispatch } from "react-redux";
import { commerce } from "../lib/commerce";
import { loadCartItems } from "../app/slice";
import { Grid, Box, Button, Typography } from "@material-ui/core";

export default function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  function removeItem() {
    commerce.cart
      .remove(item.id)
      .then((res) => dispatch(loadCartItems(res.cart)));
  }

  return (
    <Grid item xs={12} md={3}>
      <img
        className="cart-item__image"
        src={item.media.source}
        alt={item.name}
      />
      <Box className="cart-item__details">
        <Typography mt={6} variant="h6">
          {item.name}
        </Typography>
        <div className="cart-item__details-qty">
          {/* <button type="button" title="Reduce quantity">-</button>
              <p>qua: {item.quantity}</p>
              <button type="button" title="Increase quantity">+</button> */}
        </div>
        <Typography mt={6} variant="body1">
          {item.line_total.raw} zł
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => removeItem()}>
        Usuń z koszyka
      </Button>
    </Grid>
  );
}
