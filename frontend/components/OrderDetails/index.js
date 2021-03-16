import ShipmentDetails from "./ShipmentDetails";
import ItemDetails from "./ItemDetails";
import { Grid, makeStyles } from "@material-ui/core";
import PayButton from "../Checkout/PayButton";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
}));
const index = ({ order }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item md={8} xs={12}>
        {order && <ItemDetails order={order} />}
      </Grid>
      <Grid item md={4} xs={12}>
        {order?.isPaid === false && (
          <PayButton
            data={{
              sessionId: order.checkout_session,
              price: order.totalPrice,
              orderId: order.id,
            }}
          />
        )}

        {order?.shippingAddress && (
          <ShipmentDetails shippingAddress={order.shippingAddress} />
        )}
      </Grid>
    </Grid>
  );
};

export default index;
