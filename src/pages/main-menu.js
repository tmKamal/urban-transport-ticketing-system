import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import MenuBtn from "../components/ui-elements/menu-btn";
import bgImage from "../assets/images/dashboard-bg.png";


const useStyles = makeStyles((theme) => ({
  layout: {
    
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginLeft: "auto",
      marginRight: "auto",
  },
  root: {
    paddingTop: "30px",
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainText:{
    fontSize: "3.2rem",
                textTransform: "uppercase",
                fontWeight: "700",
                color: "#666",
                textAlign: "center",
                marginTop: "1rem",
                marginBottom: "0rem",
                textShadow:
                  "1px 0px 1px #ccc, 0px 1px 1px #eee, \n    2px 1px 1px #ccc, 1px 2px 1px #eee,\n    3px 2px 1px #ccc, 2px 3px 1px #eee,\n    4px 3px 1px #ccc, 3px 4px 1px #eee,\n    5px 4px 1px #ccc, 4px 5px 1px #eee,\n    6px 5px 1px #ccc, 5px 6px 1px #eee,\n    7px 6px 1px #ccc",
  }
}));

const MainMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box my={0} mx={4}>
        <Grid lg={10} className={classes.layout} container spacing={3}>
          <Grid item xs={12}>
            <h1
              className={classes.mainText}
            >
              Manager Dashboard
            </h1>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn
              url={"/make-payments"}
              name="PAYMENTS"
              image="payment"
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn
              url={"/journey-history"}
              name="JOURNEYS"
              image="else"
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn
              url={"/bus-register"}
              name="BUS REGISTRATION"
              image="bus"
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn
              url={"/payment-history"}
              name="PAYMENT HISTORY"
              image="payment-history"
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn
              url={"/foreign-register"}
              name="FOREIGN REGISTRATION"
              image="foreign"
            ></MenuBtn>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MenuBtn url={"/logout"} name="LOG OUT" image="logout"></MenuBtn>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default MainMenu;
