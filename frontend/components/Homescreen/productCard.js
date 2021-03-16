import {
  Typography,
  Tooltip,
  Button,
  Divider,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import Link from "next/link";
import Drawer from "../Drawer";
import React, { useState } from "react";
import { addToCart } from "../../utils/cartActions";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Star from "@material-ui/icons/Star";
import StarHalf from "@material-ui/icons/StarHalf";
import CartIcon from "@material-ui/icons/AddShoppingCart";
import useStyles from "./style";
import Image from "next/image";
const index = ({ product, detailPage }) => {
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.productWrapper}>
        <div className={classes.productimg}>
          <Link href={`/product/${product.slug}`}>
            <CardActionArea>
              <Image
                src={product.image.url}
                alt={product.meta_title}
                width={detailPage ? "150" : "200"}
                height={detailPage ? "150" : "200"}
              />
            </CardActionArea>
          </Link>
          <div className={classes.offInfo}>25% off</div>
          <Tooltip title='Add To cart' placement='top'>
            <IconButton
              className={classes.addIcon}
              onClick={() => {
                addToCart(product.id).then(() => toggleDrawer());
              }}
            >
              <CartIcon size='small' />
            </IconButton>
          </Tooltip>
        </div>
        {detailPage && <Divider />}
        <div className={classes.info}>
          <div className={classes.infoTop}>
            <Typography variant='h3' className={classes.smTitle}>
              LIFESTYLE
            </Typography>
            <div className={classes.rating}>
              <Star fontSize='small' /> <Star fontSize='small' />
              <Star fontSize='small' />
              <StarHalf fontSize='small' />
            </div>
          </div>
          {/* <Link href={`/product/${product.slug}`}> */}
          <Typography variant='h2' className={classes.productName} gutterBottom>
            {product.name}
          </Typography>
          {/* </Link> */}
          <div className={classes.lowest}>
            <Typography variant='subtitle1' className={classes.priceCut}>
              ${product.price + 25}
            </Typography>
            <Typography variant='subtitle1' className={classes.price}>
              ${product.price}
            </Typography>
            <Button
              style={{
                background: "#40c9a2",
                marginTop: "15px",
                justifySelf: "end",
              }}
              size='small'
              variant='contained'
              endIcon={<ShoppingBasketIcon />}
              disableElevation
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
      <Drawer toggleDrawer={() => toggleDrawer()} state={drawer} />
    </>
  );
};

export default index;
// const aboveXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
// const aboveSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
// const aboveMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
// const abovelg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
// const abovexl = useMediaQuery((theme) => theme.breakpoints.up("xl"));
// const bk = {
//   aboveXs,
//   aboveSm,
//   aboveMd,
//   abovelg,
//   abovexl,
// };
// // console.table(bk);
