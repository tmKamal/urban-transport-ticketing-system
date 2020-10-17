import React, { useState, useEffect } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  makeStyles,
  Paper,
  Chip,
  Box,
} from "@material-ui/core";
import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },

  marginT: {
    marginTop: "2rem",
  },
}));

const PaymentHistory = () => {
  const classes = useStyles();
  const [loadedPayments, setLoadedPayments] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoadedPayments(
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_API}/api/payment/all-payments`
          )
        );
      } catch (err) {}
    };
    fetchPayments();
  }, [sendRequest]);

  return (
    <Box my={5} mx={36}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.marginT}
          >
            Payments
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>

                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Method</TableCell>
                  <TableCell align="center">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  loadedPayments &&
                  loadedPayments.payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell component="th" scope="row">
                        {payment.passengerId.name}
                      </TableCell>

                      <TableCell align="center">{payment.amount}.00</TableCell>
                      <TableCell align="center">{payment.type}</TableCell>

                      <TableCell align="center">
                        {payment.passengerId.role === "Foreigner" ? (
                          <Chip color="secondary" label="Foreigner" />
                        ) : (
                          <Chip color="primary" label="Local" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!isLoading &&
            loadedPayments &&
            loadedPayments.payments.length === 0 && (
              <React.Fragment>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                  className={classes.marginT}
                >
                  0 payments
                </Typography>
              </React.Fragment>
            )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default PaymentHistory;
