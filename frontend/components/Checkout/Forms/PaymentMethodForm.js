import React from "react";
import { RadioField } from "../../FormFields";
import { Typography } from "@material-ui/core";

import paymentOptions from "../FormModel/PaymentOptions";
export default function PaymentMethodForm(props) {
  const {
    formField: { paymentMethod },
  } = props;
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment Method
      </Typography>
      <RadioField name={paymentMethod.name} data={paymentOptions} />
    </>
  );
}
