import React, { useEffect, useState } from "react";
import Counter from "../Counter";
import useUser from "../../lib/useUser";
import SigninDialog from "../Signin";
import Link from "next/link";
import Invoice from "./Invoice";
import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead as THEAD,
  TableBody as TBODY,
  TableRow as TRow,
  TableCell as TD,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PayIcon from "@material-ui/icons/AccountBalance";
import {
  getCartItems,
  incOrDec,
  remove,
  getCartInvoice,
} from "../../utils/cartActions";
import useStyles from "./style";
import LoginBtn from "../LoginBtn";
import Image from "next/image";
export default function Cart() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const { user } = useUser();
  const classes = useStyles();
  const [cartItems, setCartItems] = useState();
  const [loading, setLoading] = useState(false);
  const [cartInvoice, setcartInvoice] = useState();
  useEffect(() => {
    setCartItems(getCartItems());
    setcartInvoice(getCartInvoice());
  }, [loading]);
  const handleCount = (id, inc = true) => {
    inc && incOrDec(id);
    !inc && incOrDec(id, false);
    setLoading(!loading);
  };
  return (
    <>
      <Typography variant='h6' align='center' className={classes.heading}>
        Your Cart
        <Divider />
      </Typography>

      <Grid container justify='center'>
        {cartItems ? (
          <>
            <Grid item md={8} xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <THEAD>
                    <TRow>
                      <TD>Product</TD>
                      <TD align='left'>Qty.</TD>
                      <TD align='right'>Sum</TD>
                    </TRow>
                  </THEAD>
                  <TBODY>
                    {cartItems.map((cart) => (
                      <TRow key={cart.id}>
                        <TD>
                          <Grid container>
                            <Grid item xs={3}>
                              <Image
                                src={cart.image}
                                alt={cart.name}
                                width='60'
                                height='60'
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography variant='subtitle2' gutterBottom>
                                {cart.name}
                              </Typography>

                              <Typography variant='subtitle2' gutterBottom>
                                ${cart.price}
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Tooltip
                                title='Remove Forever'
                                placement='bottom'
                              >
                                <IconButton
                                  onClick={() => {
                                    remove(cart.id);
                                    setLoading(!loading);
                                  }}
                                >
                                  <DeleteForeverIcon
                                    size='large'
                                    style={{ color: "red" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </TD>
                        <TD align='center'>
                          <Counter
                            inc={() => handleCount(cart.id)}
                            dec={() => handleCount(cart.id, false)}
                            qty={cart.qty}
                            handleCount={handleCount}
                          />
                        </TD>
                        {/* <TD align='center'>{cart.price}</TD> */}
                        <TD align='right'>
                          ${(cart.price * cart.qty).toFixed(2)}
                        </TD>
                      </TRow>
                    ))}
                  </TBODY>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4} className={classes.invoice}>
              <Invoice cartInvoice={cartInvoice} />
              {!user?.isLoggedIn && <LoginBtn toggleDialog={toggleDialog} />}
              <Link href='/checkout'>
                <Button
                  endIcon={<PayIcon />}
                  className={classes.checkBtn}
                  fullWidth
                  disabled={!user?.isLoggedIn && true}
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </Grid>
          </>
        ) : (
          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography color='textSecondary' variant='h4' gutterBottom>
                  Your Cart is empty.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href='/'>
                  <Button variant='contained' color='primary'>
                    Countinue Shopping
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        )}
        {!user?.isLoggedIn && (
          <SigninDialog open={dialogOpen} close={toggleDialog} />
        )}
      </Grid>
    </>
  );
}
