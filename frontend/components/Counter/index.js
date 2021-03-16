import { Typography, IconButton, makeStyles } from "@material-ui/core";

import PlusOne from "@material-ui/icons/Add";
import MinusOne from "@material-ui/icons/Remove";
const useStyles = makeStyles((theme) => ({
  counterInput: {
    display: "inline-block",
    width: 70,
    textAlign: "center",
    padding: "10px 0",
    margin: theme.spacing(0, 0.5, 0, 0.5),
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#ddd",
    border: "none",
  },
  counter: {
    display: "flex",
    alignItems: "center",
    marginLeft: 20,
  },
  checkout: {
    margin: theme.spacing(2, 0),
    display: "flex",
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#ddd",
  },
}));
const index = ({ inc, dec, handleCount, qty }) => {
  const cls = useStyles();
  return (
    <div>
      <div className={cls.checkout}>
        {/* <Typography variant='subtitle1'> Qty:-</Typography> */}
        <div className={cls.counter}>
          <IconButton size='small' className={cls.icon} onClick={inc}>
            <PlusOne size='small' />
          </IconButton>
          <div className={cls.counterInput}>{qty}</div>
          <IconButton
            size='small'
            disabled={qty <= 1}
            className={cls.icon}
            onClick={dec}
          >
            <MinusOne size='small' />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default index;
