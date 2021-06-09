import { loadCartItems, openPreview } from "../app/slice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import { Grid, Box, Button, Typography, Container } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function ItemPreview() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
  }

  const product = useSelector((state) => state.shop.itemPreview.product);
  const shop = useSelector((state) => state.shop.cartItems);
  const [isItemInCart, setIsItemInCart] = useState(false);

  function isItemIncluded() {
    if (shop.line_items?.some((item) => item.product_id === product?.id)) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
  localStorage.setItem('product', JSON.stringify(product) );
  },[])

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
          handleClick();
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

  function closeItemPreview() {
    dispatch(openPreview({ open: false, product: {} }));
    localStorage.removeItem('product');
  }

  return (
    <Box mt={2}>
      <Container maxWidth="xl">
        <Grid container justify="center" spacing={-2} >
          <Grid item xs={12} md={6}>
            <img
              className="product__image"
              src={product.media ? product.media.source : JSON.parse(window.localStorage.getItem('product')).media.source  }
              alt={product?.name}
            />
          </Grid>
          <Grid item xs={12} md={6} >
            <Box mt={window.innerWidth < 800 ? 2 : 5 } mr={window.innerWidth < 800 ? 0 : 20 }>
            <Typography variant="h6" style={{ textAlign: window.innerWidth < 800 ? "center" : "left" }}>
              {product?.name}
            </Typography>
            <Box mt={1}>
              <Typography variant="body1" style={{ textAlign: window.innerWidth < 800 ? "center" : "left" }}>
                {product.description ? product.description.replace("<p>", "").replace("</p>", "") : ""}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="body2" style={{ textAlign: window.innerWidth < 800 ? "center" : "left" }}>
                CENA: {product.price ? product.price.raw : ""} zł
              </Typography>
            </Box>
         
            </Box>

          </Grid>
        </Grid>
      </Container>
      <Box mt={3}>
        {!isItemInCart ? (
          <Button
          variant="contained" color="primary" onClick={() => handleAddToCart(product?.id, 1)}>
           DODAJ DO KOSZYKA
          </Button>
        ) : (
          <Button variant="contained" disabled>
            W KOSZYCZKU
          </Button>
        )}
      </Box>

      <Box mt={2}>
      <Link to="/" className="reset__link" > 
      <Button   variant="contained"  disable onClick={() => closeItemPreview()}>
          CLOSE 
      </Button>
      </Link>
      </Box>

      <Snackbar
      autoHideDuration={600}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        message="DODANE DO KOSZYKA"
        action={
          <>
            <Button color="primary" size="small" >
              Przejdź do koszyka
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" >
              <CloseIcon fontSize="small" onClick={() => handleClose}/>
            </IconButton>
          </>
        }
      />

    </Box>
  );
}
