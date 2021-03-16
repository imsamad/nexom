import { Typography, Divider, Grid } from "@material-ui/core";
import useStyles from "./style";
import { toMoney } from "../../utils/utils";
const invoice = ({
  cartInvoice: { invoiceSubtotal, taxPrice, shippingPrice, totalPrice },
}) => {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Grid container className={classes.checkout}>
        <Grid item xs={6}>
          <Typography gutterBottom variant='body1'>
            Subtotal
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography gutterBottom variant='body1' align='right'>
            {toMoney(invoiceSubtotal)}
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography gutterBottom variant='body1'>
            Taxes
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography gutterBottom variant='body1' align='right'>
            ${taxPrice}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant='body1'>
            Shipping price
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant='body1' align='right'>
            ${shippingPrice}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.checkout}>
        <Grid item xs={6}>
          <Typography gutterBottom variant='body1'>
            Total
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant='body1' align='right'>
            ${totalPrice}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
export default invoice;
