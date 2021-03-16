import CheckoutPage from "./Page";
import { makeStyles, Grid, Paper } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));
const index = ({user}) => {
  const cls = useStyle();
  return (
    <Grid justify='center' container>
      <Grid item xs={12} sm={12} md={8}>
        <Paper className={cls.paper}>
          <CheckoutPage  user={user} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default index;
