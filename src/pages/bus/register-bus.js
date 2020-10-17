import React, { useState,useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  
  button: {
    marginTop: theme.spacing(3),
    
  },
}));

const RegisterBus = () => {
  const classes = useStyles();
  const { isLoading,error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [routesData,setRoutesData]=useState();
  const [values, setValues] = useState({
    regNo: "",
    password: "",
    routeId: "",
  });

  const { regNo, password, routeId } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  useEffect(() => {
    //fetch routes
    const fetchRoutes = async () => {
      try {
        const responseRoutes = await sendRequest(
            `${process.env.REACT_APP_BACKEND_API}/api/bus-route/get-all`
        );
        console.log(responseRoutes);
        setRoutesData(responseRoutes);
      } catch (err) {}
    };
    fetchRoutes();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const busInfo = {
      regNo,
      password,
      routeId,
    };
    console.log(busInfo);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/api/bus/signup`,
        "POST",
        JSON.stringify(busInfo),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setValues({
          regNo: "",
          password: "",
          routeId: "",
        });
        console.log(responseData);
        setMsg(true);
      }
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main style={{ marginTop: "100px" }} className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Register a Bus
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("regNo")}
                  value={regNo}
                  id="regNo"
                  name="regNo"
                  variant="outlined"
                  label="Registration NO"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("password")}
                  value={password}
                  id="password"
                  name="password"
                  variant="outlined"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Route Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={routeId}
                    onChange={onChangeHandler("routeId")}
                    label="Select a route"
                  >
                    {!isLoading &&
                      routesData &&
                      routesData.routes.map((r) => {
                        return (
                          <MenuItem key={r._id} value={r._id}>
                            {r.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error}</strong>
                  </Alert>
                </Grid>
              )}
              {msg && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <AlertTitle>Success !!</AlertTitle>
                    Bus has been registered successfully.
                  </Alert>
                </Grid>
              )}
            </Grid>

            <div className={classes.buttons}>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
                href="/"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Register
              </Button>
              
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default RegisterBus;
