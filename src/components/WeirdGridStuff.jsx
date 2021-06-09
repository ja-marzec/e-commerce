import { Grid, Box, Button, Typography } from "@material-ui/core";
import { ImportantDevices } from "@material-ui/icons";

export default function WeirdGridStuff() {
  return (
    <Box mb={20} mt={10}>
      <Grid container >
        <Grid item md="4">
          <img
            src="https://picsum.photos/id/116/500/500"
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid black",
            }}
          />
        </Grid>

        <Grid item md="3" >
            
          <img
            src="https://picsum.photos/id/181/1000/1000"
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid black",
            }}
          />
        </Grid>

        <Grid item md="5" >
          <img
            src="https://picsum.photos/id/117/500/500"
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid black",
            }}
          />
        </Grid>
      </Grid>


      <Grid container justify="center">
        <Grid item md="3"
        style={{
            height: "300px"
        }}>
          <img
            src="https://picsum.photos/id/121/500/500"
            style={{
            width: "100%",
            height: "100%",
              border: "1px solid black",
            }}
          />
        </Grid>

        <Grid item md="3"
        style={{
            height: "300px"
        }}>
          <img
            src="https://picsum.photos/id/113/500/500"
            style={{
              border: "1px solid black",
              width: "100%",
              height: "100%"
            }}
          />
        </Grid>

        <Grid item md="6"
        style={{
            height: "300px"
        }}
        >
          <img
            src="https://picsum.photos/id/115/500/500"
            style={{
              border: "1px solid black",
              width: "100%",
              height: "100%"
            }}
          />
        </Grid>
      </Grid>
      </Box>

  );
}
