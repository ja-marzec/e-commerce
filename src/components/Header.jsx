import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/cart.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Box  } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useState} from 'react';

export default function Header() {
  const shop = useSelector((state) => state.shop.cartItems);
  const [isOpen, setIsOpen] = useState(false)


  const StyledBadge = withStyles((theme) => ({
    badge: {
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <Box  className="header" mt ={2}>
      <Grid container direction={ window.innerWidth < 800 ? "column" : "row"} alignItems="center" spacing={3}>
        <Grid item xs={3}>
          <Link to="/aboutus"> ABOUT US</Link>{" "}
        </Grid>
        <Grid item xs={3}>
          <Link to="/">ELO KLAPERO</Link>
        </Grid>
        <Grid item xs={3}>
          <Link to="/contact">KONTAKT</Link>
        </Grid>
        <div class="cart__holder">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={shop.total_items} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </Grid>

      <div className="cart"></div>
    </Box>
  );
}
