import { Grid, makeStyles } from '@material-ui/core';
import ProductCard from './productCard';
const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1),
  },
}));
const index = ({ products }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product.id}
            className={classes.grid}
            item
            xs={12}
            md={4}
            lg={3}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default index;
