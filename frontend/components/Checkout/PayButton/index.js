import { Grid, Button } from "@material-ui/core";
import { STRIPE_PK, API_URL as url } from "../../../utils/utils";
import { loadStripe } from "@stripe/stripe-js";
import PayIcon from "@material-ui/icons/AccountBalance";
const stripePromise = loadStripe(STRIPE_PK);
const index = ({ data }) => {
  const handleBuy = async () => {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });
  };
  return data ? (
    <Grid container>
      <Grid xs={12} item></Grid>
      <Grid xs={12} item>
        <Button
          onClick={handleBuy}
          color='primary'
          variant='contained'
          fullWidth
          size='large'
          startIcon={<PayIcon />}
        >
          Pay ${data.price}
        </Button>
      </Grid>
    </Grid>
  ) : (
    "Try Again"
  );
};

export default index;
