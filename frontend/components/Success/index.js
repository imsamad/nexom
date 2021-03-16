import {
  makeStyles,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "next/link";
const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));
const steps = [
  "Shipping address",
  "Payment Method",
  "Review your order",
  "Paid",
];
const index = ({ order: orderId }) => {
  const cls = useStyle();
  return (
    <Grid justify='center' container>
      <Grid item xs={12} sm={12} md={8}>
        <Paper className={cls.paper}>
          <Typography component='h1' variant='h4' align='center' gutterBottom>
            Successfully Checkout
          </Typography>
          <Stepper activeStep={4} className={cls.stepper} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {!orderId ? (
            <>
              <Skeleton variant='text' />
              <Skeleton variant='text' />
              <Skeleton variant='text' />
              <Skeleton variant='text' />
            </>
          ) : (
            <>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your <Link href={`/order/${orderId}`}> order</Link>,have been
                emailed for confirmation to you, and will send you an update
                when your order has shipped.
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default index;
