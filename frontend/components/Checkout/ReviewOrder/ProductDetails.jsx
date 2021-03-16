import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import useStyles from "./styles";
import { getCartItems, getCartInvoice } from "../../../utils/cartActions";

function ProductDetails() {
  const cartItems = getCartItems();
  const cartInvoice = getCartInvoice();
  const { invoiceSubtotal, taxPrice, shippingPrice, totalPrice } = cartInvoice;

  const classes = useStyles();
  return (
    <List disablePadding>
      {cartItems?.map((cart) => (
        <ListItem className={classes.listItem} key={cart.id}>
          <ListItemIcon>
            <img src={cart.image} width='40' />
          </ListItemIcon>
          <ListItemText primary={cart.name} />
          <Typography variant='subtitle1'>
            ${cart.price} * {cart.qty}=${(cart.price * cart.qty).toFixed(2)}
          </Typography>
        </ListItem>
      ))}
      <ListItem className={classes.listItem}>
        <ListItemText primary='Subtotal' />
        <Typography variant='subtitle1' className={classes.total}>
          $ {invoiceSubtotal}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary='Taxes' />
        <Typography variant='subtitle1' className={classes.total}>
          $ {taxPrice}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary='Shhipping Price' />
        <Typography variant='subtitle1' className={classes.total}>
          $ {shippingPrice}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary='Total' />
        <Typography variant='subtitle1' className={classes.total}>
          $ {totalPrice}
        </Typography>
      </ListItem>
    </List>
  );
}

export default ProductDetails;
