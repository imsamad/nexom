import React from "react";
import { Typography, Grid } from "@material-ui/core";
import useStyles from "./styles";

function PaymentDetails({ formValues }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6}>
      <Grid container spacing={2} className={classes.title}>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom>
            Payment Method:-
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='subtitle1' gutterBottom>
            {formValues.paymentMethod.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PaymentDetails;
