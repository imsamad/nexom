import React from "react";
import { useFormikContext } from "formik";
import { Typography, Grid } from "@material-ui/core";
import ProductDetails from "./ProductDetails";
import ShippingDetails from "./ShippingDetails";
import Payment from "./Payment";

export default function ReviewOrder() {
  const { values: formValues } = useFormikContext();
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <ProductDetails />
      <Grid container spacing={2}>
        <Payment formValues={formValues} />
        <ShippingDetails formValues={formValues} />
      </Grid>
    </React.Fragment>
  );
}
