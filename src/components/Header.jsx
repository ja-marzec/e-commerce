import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/cart.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, Box, Container } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from "../assets/logo.png";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  const shop = useSelector((state) => state.shop.cartItems);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <Container >

    <Box className="header" mt={3}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={window.innerWidth < 800 ? 1 : 2}
      >
         <Grid item xs={2}>
        </Grid>
        <Grid item xs={1}>
          <Link to="/aboutus" className="reset__link">
            {" "}
            <Typography variant="h6"> O nas</Typography>{" "}
          </Link>
        </Grid>
        <Grid item xs={4} md={1}>
          <Link to="/ "  className="reset__link">
            {/* <img
              src={logo}
              style={{
                width: "90%",
                paddingTop: window.innerWidth < 800 ? "8px" : "0",
              }}
            /> */}
              <Typography variant="h6"> Kontakt </Typography>
          </Link>
        </Grid>
        <Grid item xs={2} md={1}>
          <Link to="/contact" className="reset__link">
            {" "}
            <Typography variant="h6"> Kontakt </Typography>
          </Link>
        </Grid>
        <Grid item xs={1} md={2}>
          <Link to="/cart" className="reset__link">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={shop.total_items} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      <Box mt={1} mb={1}>
        <Typography variant="h1"> NAZWA SKLEPU </Typography>
      </Box>
      <div className="cart"></div>
    </Box>
    </Container>

  );
}
