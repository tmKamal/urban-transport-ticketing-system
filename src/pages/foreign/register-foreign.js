import React, { useState } from "react";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
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
  layout: {
    marginLeft:"auto",
    marginRight:"auto"
},
}));

const RegisterForeign = () => {
  const classes = useStyles();
  const { isLoading,error, sendRequest, errorPopupCloser } = useHttpClient();
  const [msg, setMsg] = useState();
  const [values, setValues] = useState({
    email: "",
    password: "",
    passportId: "",
    name:"",
  });

  const { email, password, passportId,name } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({ ...values, [inputFieldName]: e.target.value });
    setMsg(null);
    errorPopupCloser();
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    errorPopupCloser();
    const foreignInfo = {
      email,
      password,
      passportId,
      name,
      native:false
    };
    console.log(foreignInfo);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/api/auth/signup`,
        "POST",
        JSON.stringify(foreignInfo),
        { "Content-Type": "application/json" }
      );
      if (error) {
        console.log(error);
      }
      console.log(responseData);
      if (responseData) {
        setValues({
          email: "",
          password: "",
          passportId: "",
          name:""
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

      <Grid md={5} xs={10} style={{ marginTop: "100px" }} className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Register a Foreigner
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("email")}
                  value={email}
                  id="email"
                  name="email"
                  variant="outlined"
                  label="Email"
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
                <TextField
                  required
                  onChange={onChangeHandler("passportId")}
                  value={passportId}
                  id="passportId"
                  name="passportId"
                  variant="outlined"
                  label="passportId"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("name")}
                  value={name}
                  id="name"
                  name="name"
                  variant="outlined"
                  label="name"
                  fullWidth
                />
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
                    User has been registered!
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
      </Grid>
    </React.Fragment>
  );
};
export default RegisterForeign;
