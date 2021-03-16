import React from "react";
import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";

function PaymentDetails(props) {
  const { formValues } = props;
  const classes = useStyles();
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    country,
    state,
    zipcode,
  } = formValues;
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant='h6' gutterBottom className={classes.title}>
        Shipping
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <Row name='Name' value={`${firstName} ${lastName}`} />
            <Row name='Address1' value={address1} />
            <Row name='Address2' value={address2} />
            <Row name='Zipcode' value={zipcode} />
            <Row name='City' value={city} />
            <Row name='State' value={state} />
            <Row name='Country' value={country} />
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default PaymentDetails;
const Row = ({ name, value }) => (
  <TableRow>
    <TableCell>
      <Typography variant='subtitle2' gutterBottom>
        {name}:-
      </Typography>
    </TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);
