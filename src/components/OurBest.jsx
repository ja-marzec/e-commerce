import {
  Button,
  Grid,
  Cardmedia,
  Box,
  Container,
  Typography,
} from "@material-ui/core";
import OurBestItem from "./OurBestItem";

export default function OurBest() {
  return (
    <Box mt={10} xs={12}>
      <Typography align="left" variant="h3">
        {" "}
        NASZE ULUBIONE{" "}
      </Typography>
      <Box mt={5}>
        <Grid container align="center"   justify="space-between" spacing={3} >
         <OurBestItem img={"https://picsum.photos/id/11/500/500"} />
         <OurBestItem img={"https://picsum.photos/id/12/250/250"} />
         <OurBestItem img={"https://picsum.photos/id/13/500/450"} />
        </Grid>
      </Box>
    </Box>
  );
}
