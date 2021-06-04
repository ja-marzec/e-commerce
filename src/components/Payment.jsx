import { setCheckout, setCheckoutInfo } from "../app/slice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import { loadCartItems } from "../app/slice";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { isTemplateSpan } from "typescript";

export default function Payment() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cartItems);
  const checkout = useSelector((state) => state.shop.checkout);
  const checkoutId = useSelector(
    (state) => state.shop.checkout.checkoutToken.id
  );
  const [id, setId] = useState("");

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();
    dispatch(loadCartItems(newCart));
  }

  function cleanCart() {
    commerce.cart.empty().then((response) => {
      dispatch(loadCartItems(response.cart));
      console.log(response);
    });
  }

  async function handleCaptureCheckout(checkoutTokenId, newOrder) {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      dispatch(setCheckoutInfo({ keyName: "order", value: incomingOrder }));
      console.log(incomingOrder);
    } catch (err) {
      console.log(err.data.error.message);
    }
  }

  const itemsInObj = checkout.checkoutToken.live?.line_items.reduce(
    (result, item, index, array) => {
      result[item.id] = {
        quantity: item.quantity,
      }; //a, b, c
      // result["name"] = item.name
      return result;
    },
    {}
  );
  console.log("ITEM", itemsInObj);
  function captureCheckout(b) {
    const data = {
      line_items: {
        item_7RyWOwmK5nEa2V: {
          quantity: 1,
          selected_options: {
            vgrp_p6dP5g0M4ln7kA: "optn_DeN1ql93doz3ym",
          },
        },
      },
      customer: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
      },
      shipping: {
        name: "John Doe",
        street: "123 Fake St",
        town_city: "San Francisco",
        county_state: "US-CA",
        postal_zip_code: "94103",
        country: "US",
      },
      fulfillment: {
        shipping_method: "ship_7RyWOwmK5nEa2V",
      },
      billing: {
        name: "John Doe",
        street: "234 Fake St",
        town_city: "San Francisco",
        county_state: "US-CA",
        postal_zip_code: "94103",
        country: "US",
      },
      payment: {
        gateway: "stripe",
        card: {
          token: "irh98298g49",
        },
      },
      pay_what_you_want: "149.99",
    };

    commerce.checkout
      .capture(checkoutId, data)
      .then((response) => console.log(response));
  }

  const stripePromise = loadStripe(process.env.REACT_APP_STRAPI_PUBLIC);

  async function handleSubmit(e, elements, stripe) {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });


    if (error) {
      console.error("DUUUPA", error);
    } else {
      const orderData = {
        line_items: itemsInObj,
        customer: {
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
        },
        shipping: {
          name: "John Doe",
          street: "Ciasna 5",
          town_city: "Warszawa",
          county_state: "18",
          postal_zip_code: "00-232",
          country: "PL",
        },
        fulfillment: {
          shipping_method: checkout.shippingOption.id,
        },
        billing: {
          name: "John Doe",
          street: "Ciasna 5",
          town_city: "Warszawa",
          county_state: "18",
          postal_zip_code: "00-232",
          country: "PL",
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },

        //   customer: {
        //       firstname: checkout.firstName,
        //       lastname: checkout.lastName,
        //       email: checkout.email
        //   },
        //   shipping: {
        //       name: "John Doe",
        //       street: checkout.shippingStreet,
        //       town_city: checkout.shippingCity,
        //       postal_zip_code: checkout.shippingPostalZipCode,
        //       country: "PL",
        //       county_state: checkout.shippingSubdivision
        //     },
        //     fulfillment: {
        //         shipping_method: checkout.shippingOption.id
        //     },
        //     payment: {
        //         gateway: "stripe",
        //         stripe: {
        //             payment_method_id: paymentMethod.id
        //         }
        //     }
      };
      handleCaptureCheckout(checkoutId, orderData);
    }
  }

  return (
    <Box mt={2}>
      <Box  mb={5}>

        <Typography mt={6} variant="h6">
          ZAPŁAĆ
        </Typography>
      </Box>

      <Container maxWidth="sm">
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <div>
                  {/* <Button variant="contained">Wróć </Button> */}
                  <Box mt={5}>
                    <Button variant="contained" color="primary" type="sumbit">
                      Zapłać: {cart.subtotal?.raw} zł{" "}
                    </Button>
                  </Box>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </Container>
    </Box>
  );
}
