import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Table
} from "@material-ui/core";
const ShipmentDetails = ({ shippingAddress }) => {
  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan="2" align="center"  >Shipping To</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <Row name='First Name' value={shippingAddress.firstName} />
        <Row name='Last Name' value={shippingAddress.lastName} />
        <Row name='Address 1' value={shippingAddress.address1} />
        <Row name='Address 2' value={shippingAddress.address2} />
        <Row name='City ' value={shippingAddress.city} />
        <Row name='Zipcode ' value={shippingAddress.zipcode} />
        <Row name='State ' value={shippingAddress.state} />
      </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentDetails;
const Row = ({ name, value, ...rest }) => (
  <TableRow {...rest}>
    <TableCell>
      <Typography variant='subtitle2' gutterBottom>
        {name}:-
      </Typography>
    </TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);
