import { Grid, Cardmedia, Box } from "@material-ui/core";
import ProductsList from "./ProductsList";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Home() {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            item
            style={{
              backgroundImage: `url(https://picsum.photos/id/129/1600/450)`,
              height: "450px",
            }}
          >
            <Grid
              style={{ height: "100%" }}
              container
              justify="center"
              alignItems="center"
            >
              <Grid xs={10}>
                <Typography mt={6} variant="h5" color="textPrimary" style={{color: "white", fontWeight: 600}}>
                  SKLEP DLA DOBRYCH MORDECZEK
                </Typography>
                <Typography mt={6} variant="body1" color="textPrimary" style={{color: "white", fontWeight: 600}}>
                  PRZEROBIONE CIUCHY DLA KAŻDEGO
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Box mt={5}>
            <Typography mt={6} variant="h5">
              {" "}
              NASZE COOL PRZERÓBKI
            </Typography>
            <Typography variant="body2"> OBCZAJ CO TU MAMY </Typography>
          </Box>
        </Grid>
      </Grid>
      <ProductsList />
    </Box>
  );
}
