import { Grid, Cardmedia, Box, Container } from "@material-ui/core";
import ProductsList from "./ProductsList";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import InfoSection from './InfoSection'
import OurBest from "./OurBest";
import InfoSectionRiverse from "./InfoSectionRiverse";
import WeirdGridStuff from "./WeirdGridStuff";
import ContactSection from "./ContactSection";

export default function Home() {
  return (
    <Container
    style={{
      backgroundColor: `white`,
      // border: "10px solid black"
    }}
    >
      {/* <Box ml={5} mr={5} mt={10}> */}
       <Container 
       maxWidth="xl"
           style={{
            // backgroundColor: `red`,
          }}
       >
      <Box mt={2}>
        <Grid spacing={3}>
          <Grid item xs={12}>
            <Box
              item
              style={{
                backgroundImage: `url(https://picsum.photos/id/129/1600/450)`,
                height: "500px",
              }}
              className="container__img"
            >
              <Grid
                style={{ height: "100%" }}
                container
                justify="center"
                alignItems="center"
              >
                <Grid xs={10}>
                  <Typography
                    mt={6}
                    variant="h5"
                    color="textPrimary"
                    style={{ color: "white", fontWeight: 600 }}
                  >
                    SKLEP DLA DOBRYCH MORDECZEK
                  </Typography>
                  <Typography
                    mt={6}
                    variant="body1"
                    color="textPrimary"
                    style={{ color: "white", fontWeight: 600 }}
                  >
                    PRZEROBIONE CIUCHY DLA KAŻDEGO
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {/* <Box mt={5}>
              <Typography mt={6} variant="h5">
                {" "}
                NASZE COOL PRZERÓBKI
              </Typography>
              <Typography variant="body2"> OBCZAJ CO TU MAMY </Typography>
            </Box> */}
            
          </Grid>
          
        </Grid>
        <InfoSection />
    <OurBest /> 
    <WeirdGridStuff />

        <ProductsList />
        <InfoSectionRiverse />

<ContactSection />
      </Box>
    </Container>

    {/* </Box> */}
<Box  mb={20}>
  </Box>
    </Container>

  );
}
