import { Grid, Cardmedia, Box, Container, Typography } from "@material-ui/core";

export default function InfoSectionRiverse() {
  return (
    <Box mt={10}>
    <Grid direction="row" justify="center" spacing={2} container>

      <Grid xs={12} md={6} item>
        <Box mt={10}>
          <Typography variant="h3">
            THAT IS BIG <br /> BULKY TEXT
          </Typography>
          <Box mt={7}>
            <Typography variant="body1">
              That is casualt text, that is made of casual <br /> text to show
              how casual text will <br /> look like at this awesome webpage{" "}
              <br />
              That is casualt text, that is made of casual <br /> text to show
              how casual text will <br /> look like at this awesome webpage
            </Typography>
          </Box>
          <Box
            mt={7}
          >
            <Grid container spacing={3} direction="row" >
            <Grid item xs={0}>
              </Grid>
              <Grid
              item sx={3}
                style={{
                  backgroundImage: `url(https://picsum.photos/id/121/1600/450)`,
                  height: "400px",
                  width: "400px",
                }}
              ></Grid>
            
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={6}
        item
        style={{
          backgroundImage: `url(https://picsum.photos/id/229/1600/450)`,
          height: "650px",
          width: "450px",
        }}
      ></Grid>
    </Grid>
  </Box>
  );
}
