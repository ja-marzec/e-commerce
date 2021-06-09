import {
    Button,
    Grid,
    Cardmedia,
    Box,
    Container,
    Typography,
  } from "@material-ui/core";

export default function OurBestItem({img, link}) {
    return (
        <Grid item md={4} xs={12}>
          <Box
           style={{
            position: "relative",
          }}
          >
  <Box
            mt={-3}
            style={{
              position: "absolute",
              bottom: "-4%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button variant="contained">ZOBACZ</Button>
          </Box>
          <img src={img} 
             style={{
              height: "100%",
              width: "100%"
            }}
          />
          </Box>

        {/* <Box
          style={{
            backgroundImage: `url(${img})`,
            height: "300px",
            width: "300px",
            position: "relative",
          }}
        >
          <Box
            mt={-3}
            style={{
              position: "absolute",
              bottom: "-5%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button variant="contained">ZOBACZ</Button>
          </Box>
        </Box> */}
      </Grid>
    )
}