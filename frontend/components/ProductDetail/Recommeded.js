import { Typography, Grid } from "@material-ui/core";
const Recommeded = () => {
  return (
    <>
      <Typography variant='h6' className={cls.details} gutterBottom>
        Related Products, We picked them just for you Before you leave, take a
        {/* look at these items. We picked them just for you */}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} xl={2}>
          {/* <ProductCard detailPage product={product} /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Recommeded;
