import {
  Container,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout, setCheckoutInfo } from "../app/slice";
import { commerce } from "../lib/commerce";
import Payment from "./Payment";

export default function Order() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cartItems);
  const checkout = useSelector((state) => state.shop.checkout);
  const checkoutId = useSelector(
    (state) => state.shop.checkout.checkoutToken.id
  );
  const [id, setId] = useState("");
  const marginTopInForm = 4

  function useEffectUpdate(effect, deps) {
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (!isFirstRender.current) {
        effect();
      }
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      isFirstRender.current = false;
    }, []);
  }

  async function generateCheckoutToken() {
    commerce.checkout
      .generateToken(cart.id, { type: "cart" })
      .then((token) => {
        dispatch(setCheckout(token));
      })
      .catch((error) => {
        console.log("There was an error in generating a token", error);
      });
  }

  useEffect(() => {
    generateCheckoutToken();
    // if(checkoutId) {
    //   fetchShippingCountries()
    // }
    fetchSubdivisions("PL");
  }, []);
  useEffectUpdate(() => {
    fetchShippingCountries();
  }, [checkoutId]);
  useEffectUpdate(() => {
    fetchShippingOptions(checkoutId, checkout.shippingSubdivision);
  }, [checkoutId]);

  function handleInputChange(e) {
    dispatch(
      setCheckoutInfo({ keyName: e.target.name, value: e.target.value })
    );
  }

  function fetchShippingCountries() {
    console.log("ID HERE", checkoutId + "11");
    commerce.services
      .localeListShippingCountries(checkoutId)
      .then((countries) => {
        console.log("COUNTRY", countries);
        //   this.setState({
        // shippingCountries: countries.countries,
        //   })
      })
      .catch((error) => {
        console.log(
          "There was an error fetching a list of shipping countries",
          error
        );
      });
  }

  function fetchSubdivisions(countryCode) {
    commerce.services
      .localeListSubdivisions(countryCode)
      .then((subdivisions) => {
        console.log("SUB", subdivisions);
        dispatch(
          setCheckoutInfo({
            keyName: "shippingSubdivisions",
            value: subdivisions.subdivisions,
          })
        );
      })
      .catch((error) => {
        console.log("There was an error fetching the subdivisions", error);
      });
  }

  function fetchShippingOptions(checkoutTokenId, region = null) {
    commerce.checkout
      .getShippingOptions(checkoutTokenId, {
        country: "PL",
      })
      .then((options) => {
        console.log(options);
        const shippingOption = options[0] || null;
        dispatch(
          setCheckoutInfo({ keyName: "shippingOptions", value: options })
        );
        dispatch(
          setCheckoutInfo({ keyName: "shippingOption", value: shippingOption })
        );

        // this.setState({
        //   shippingOptions: options,
        //   shippingOption: shippingOption,
        // })
      })
      .catch((error) => {
        console.log("There was an error fetching the shipping methods", error);
      });
  }

  return (
    <div>
      <Typography variant="h6"> FORMULARZ ZAMÓWIONKA </Typography>
      <Box mt={3}>
        {checkout !== undefined ? (
          <form>
            <Container maxWidth="sm">
              <Grid container>
                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="firstName"
                    label="Imię"
                    name="firstName"
                    value={checkout?.firstName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="lastName"
                    label="Nazwisko"
                    name="lastName"
                    value={checkout?.lastName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="email"
                    label="Imię"
                    name="email"
                    value={checkout?.email}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="shippingName"
                    label="Imię na dostawie"
                    name="shippingName"
                    value={checkout?.shippingName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="shippingStreet"
                    label="Adress"
                    name="shippingStreet"
                    value={checkout?.shippingStreet}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="shippingCity"
                    label="Miasto"
                    name="shippingCity"
                    value={checkout?.shippingCity}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box mt={marginTopInForm}>
                  <TextField
                    id="shippingPostalZipCode"
                    label="Kod pocztowy"
                    name="shippingPostalZipCode"
                    value={checkout?.shippingPostalZipCode}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </Box>
                </Grid>


                <Grid item xs={12} md={12}>
                  <Box mt={marginTopInForm}>
                    <InputLabel id="label">Opcja Dostawy</InputLabel>
                    <Select
                      labelId="label"
                      id="select"
                      value={checkout.shippingOption}
                      onChange={(e) => {
                        dispatch(
                          setCheckoutInfo({
                            keyName: "shippingOption",
                            value: e.target.value,
                          })
                        );
                      }}
                    >
                      {checkout.shippingOptions.map((item) => {
                        console.log("SHIPPING",item)
                        return (
                          <MenuItem value={item}>{item.description} ({item.price.raw} zł) </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </form>
        ) : null}
      </Box>

      <Payment />
    </div>
  );
}
