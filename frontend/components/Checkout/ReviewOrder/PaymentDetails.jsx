import React, { useEffect } from "react";
import moment from "moment";
import { Typography, Grid } from "@material-ui/core";
import useStyles from "./styles";

function PaymentDetails(props) {
  const { formValues } = props;
  const classes = useStyles();
  const { nameOnCard, cardNumber, expiryDate } = formValues;
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant='h6' gutterBottom className={classes.title}>
        Payment details
      </Typography>
      <Grid container direction='column'>
        <>
          <Grid item xs={6}>
            <Typography gutterBottom>Card type</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Visa</Typography>
          </Grid>
        </>
        <>
          <Grid item xs={6}>
            <Typography gutterBottom>Card holder</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{nameOnCard}</Typography>
          </Grid>
        </>
        <>
          <Grid item xs={6}>
            <Typography gutterBottom>Card number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{cardNumber}</Typography>
          </Grid>
        </>
        <>
          <Grid item xs={6}>
            <Typography gutterBottom>Expiry Date</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              {moment(expiryDate).format("MM/YY")}
            </Typography>
          </Grid>
        </>
      </Grid>
    </Grid>
  );
}

export default PaymentDetails;
