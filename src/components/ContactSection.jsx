import { Grid, Cardmedia, Box, Container, Typography } from "@material-ui/core";

export default function ContactSection() {
  return (
    <Box mt={10}>
      <Box mt={5} mb={5}>
        <Typography variant="h3">Kontakt</Typography>
      </Box>
      <Box>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={3}>
            <img
              src="https://picsum.photos/id/39/1600/450"
              style={{
                height: "100%",
                width: "100%",
                border: "1px solid black",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://picsum.photos/id/329/1600/450"
              style={{
                height: "200%",
                width: "100%",
                border: "1px solid black",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <img
              src="https://picsum.photos/id/29/1600/450"
              style={{
                height: "100%",
                width: "100%",
                border: "1px solid black",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={25}>
        <Typography variant="body1">@instagram</Typography>
      </Box>
    </Box>
  );
}
