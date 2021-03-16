import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    padding: theme.spacing(2),
  },
  fullList: {
    width: "auto",
  },

  item: {
    padding: theme.spacing(1, 1, 1, 0),
    // border: "2px solid red",
  },
  itemImg: {
    padding: theme.spacing(0.5),
  },
  itemInfo: {
    padding: theme.spacing(1, 0, 1, 1),
  },
  counterInput: {
    display: "inline-block",
    padding: "5px",
    width: 20,
    height: 20,
    margin: theme.spacing(0, 0.5, 0, 0.5),
  },
  itemPrice: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  checkout: {
    padding: theme.spacing(2),
  },
  checkBtn: {
    background: "#777",
    color: "#fff",
    padding: "10px ",
    margin: theme.spacing(2, 0, 3, 0),
    border: "2px solid #000",
    transition: "color 300ms",
    "&:hover": {
      background: "#eee",
      color: "#000",
      border: "2px solid #000",
    },
  },
  closeBtn: {
    position: "fixed",
    top: "10px",
    right: "20px",
  },
  goTo: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
    margin: theme.spacing(1, 0, 1, 1),
  },
  noCart: {
    padding: theme.spacing(3),
  },
}));
