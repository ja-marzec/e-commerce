import { Grid, Cardmedia } from "@material-ui/core";
import ProductsList from "./ProductsList";

export default function Home() {

    return(
            <Grid container spacing={3} >
            <Grid item xs={12} >
                <img src="https://picsum.photos/id/1002/1600/500" />
            </Grid>
            <Grid item xs={12}>
            SKLEP DLA KAŻDEGO

            </Grid>
            <ProductsList />
            </Grid>

    )
}