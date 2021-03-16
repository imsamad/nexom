import {   makeStyles  } from "@material-ui/core";
export default makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(0, 0, 4, 0),
  },
  info: {
    padding: theme.spacing(2),
  },
  select: {
    display: "block",
    padding: "5px",
    margin: "10px 0 0 0 ",
  },

  detail: {
    margin: theme.spacing(2, 0, 0, 0),
  },

  cartBtn: {
    margin: theme.spacing(2, 0),
  },
}));
