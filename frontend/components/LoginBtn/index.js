import { Button, makeStyles } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/PersonAdd";
const useStyles = makeStyles((theme) => ({
  checkBtn: {
    background: "#777",
    color: "#fff",
    padding: "10px ",
    border: "2px solid #000",
    transition: "color 300ms",
    margin: theme.spacing(0, 0, 1, 0),
    "&:hover": {
      background: "#eee",
      color: "#000",
      border: "2px solid #000",
    },
  },
}));
const index = ({ toggleDialog }) => {
  const classes = useStyles();
  return (
    <Button
      color='primary'
      endIcon={<LoginIcon />}
      className={classes.checkBtn}
      onClick={toggleDialog}
      fullWidth
    >
      Log in To Checkout
    </Button>
  );
};

export default index;
