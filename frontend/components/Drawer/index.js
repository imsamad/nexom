import React, { useEffect, useState } from "react";
import PlusOne from "@material-ui/icons/Add";
import MinusOne from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import { toMoney } from "../../utils/utils";
import useUser from "../../lib/useUser";

import {
  getCartItems,
  incOrDec,
  remove,
  getCartInvoice,
} from "../../utils/cartActions";
import CloseIcon from "@material-ui/icons/Close";
import PayIcon from "@material-ui/icons/AccountBalance";
import {
  Drawer,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Grid,
} from "@material-ui/core";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Invoice from "./invoice";
import useStyles from "./style";

import LoginBtn from "../LoginBtn";
import SigninDialog from "../Signin";
export default function TemporaryDrawer({ toggleDrawer, state }) {
  // state && toggleDrawer();
  const { user } = useUser();

  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCart] = useState(false);
  const [cartInvoice, setCartInvoice] = useState();
  useEffect(() => {
    const items = getCartItems();
    setCart(items);
    setCartInvoice(getCartInvoice());
  }, [state, loading]);
  const classes = useStyles();
  const list = (
    <div className={classes.root}>
      <div>
        <Typography variant='h5' gutterBottom>
          My Cart
        </Typography>
        <Link href='/cart'>
          <Typography
            onClick={toggleDrawer}
            className={classes.goTo}
            variant='caption'
            display='block'
            gutterBottom
          >
            Go To Page
          </Typography>
        </Link>
        <IconButton onClick={toggleDrawer} className={classes.closeBtn}>
          <CloseIcon />
        </IconButton>
      </div>
      {cartItems ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <Divider />
              <Grid className={classes.item} container>
                <Grid item xs={3} className={classes.itemImg}>
                  <img src={item.image} alt='show2' width='90%' />
                </Grid>
                <Grid item xs={7} className={classes.itemInfo}>
                  <Typography variant='h6' gutterBottom>
                    {item.name}
                  </Typography>
                  <div className={classes.counter}>
                    <IconButton
                      size='small'
                      onClick={() => {
                        incOrDec(item.id);
                        setLoading(!loading);
                      }}
                    >
                      <PlusOne size='small' />
                    </IconButton>
                    <div className={classes.counterInput}>{item.qty}</div>
                    <IconButton
                      disabled={item.qty === 1}
                      size='small'
                      onClick={() => {
                        setLoading(!loading);
                        incOrDec(item.id, false);
                      }}
                    >
                      <MinusOne size='small' />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={2} item className={classes.itemPrice}>
                  <Typography align='right' variant='body2' gutterBottom>
                    {toMoney(item.price * item.qty)}
                  </Typography>
                  <Tooltip title='Delete this item from Cart.'>
                    <IconButton
                      onClick={() => {
                        remove(item.id);
                        setLoading(!loading);
                      }}
                      size='small'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          ))}
          <Invoice cartInvoice={cartInvoice} />
          <SigninDialog open={dialogOpen} close={toggleDialog} />
          {!user?.isLoggedIn && <LoginBtn toggleDialog={toggleDialog} />}
          <Link href='/checkout'>
            <Button
              endIcon={<PayIcon />}
              onClick={toggleDrawer}
              className={classes.checkBtn}
              fullWidth
              disabled={!user?.isLoggedIn && true}
            >
              Proceed To Checkout
            </Button>
          </Link>{" "}
        </>
      ) : (
        <Typography
          variant='h6'
          align='center'
          className={classes.noCart}
          gutterBottom
        >
          Your Cart is empty.
        </Typography>
      )}
    </div>
  );

  return (
    <Drawer
      anchor='right'
      open={state}
      onClose={toggleDrawer}
      variant='persistent'
    >
      {list}
    </Drawer>
  );
}
