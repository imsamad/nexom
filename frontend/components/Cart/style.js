import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  checkBtn: {
    background: "#777",
    color: "#fff",
    padding: "10px ",
    border: "2px solid #000",
    transition: "color 300ms",
    "&:hover": {
      background: "#eee",
      color: "#000",
      border: "2px solid #000",
    },
  },
  invoice: {
    padding: theme.spacing(1),
    marginRight: 0,
  },
}));
