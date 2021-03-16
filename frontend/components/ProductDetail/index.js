import { Grid, Typography, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { addToCart } from "../../utils/cartActions";
import { API_URL } from "../../utils/utils";
import useStyles from "./style";
import Image from "next/image";
// import RecommededProduct from "./Recommeded";
const index = ({ product }) => {
  const router = useRouter();
  const addCart = async () => {
    await addToCart(product?.id);
    router.push("/cart");
  };
  const cls = useStyles();
  return (
    <>
      <Grid container className={cls.wrapper}>
        <Grid item lg={4} md={3}>
           <Image
            src={product?.image?.url}
            alt={product?.name}
            width='100%'
            height='100%'
          />  
        </Grid>
        <Grid item lg={6} md={6} className={cls.info}>
          <Typography variant='h4'>{product?.name}</Typography>
          <Typography variant='h6'>${product?.price}</Typography>

          <div className={cls.cartBtn}>
            {/* <Link href='/cart'> */}
            <Button
              color='secondary'
              size='small'
              variant='contained'
              onClick={addCart}
            >
              Buy
            </Button>
            {/* </Link> */}
          </div>
          <Typography variant='h6' className={cls.detail}>
            Product Details
          </Typography>
          <Typography variant='subtitle1'>{product?.description}</Typography>
        </Grid>
        {/* <RecommededProduct/> */}
      </Grid>
    </>
  );
};

export default index;
