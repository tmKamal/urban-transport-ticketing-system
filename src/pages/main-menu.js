import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Typography } from "@material-ui/core";
import MenuBtn from "../components/ui-elements/menu-btn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const MainMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box my={5} mx={36}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" component="h1" gutterBottom>
              Manager Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MenuBtn url={"/make-payments"} name="PAYMENTS" image="payment"></MenuBtn>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MenuBtn url={"/journey-history"} name="JOURNEYS" image="else"></MenuBtn>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MenuBtn url={"/bus-register"} name="BUS REGISTRATION" image="bus"></MenuBtn>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MenuBtn url={"/payment-history"} name="PAYMENT HISTORY" image="payment-history"></MenuBtn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default MainMenu;
