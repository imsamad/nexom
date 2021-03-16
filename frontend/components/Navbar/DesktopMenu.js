import { Tooltip, IconButton, Badge } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/PersonAdd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CartIcon from "@material-ui/icons/ShoppingCart";

import useStyles from "./nav_css";
const DesktopMenu = ({
  handleProfileMenuOpen,
  isLoggedIn,
  toggleDrawer,
  toggleDialog,
  badge,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionDesktop}>
      {isLoggedIn ? (
        <IconButton onClick={handleProfileMenuOpen} color='inherit'>
          <AccountCircle />
        </IconButton>
      ) : (
        <Tooltip title='Log In'>
          <IconButton onClick={toggleDialog} color='inherit'>
            <LoginIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title='Cart'>
        <IconButton onClick={() => toggleDrawer()} color='inherit'>
          <Badge badgeContent={badge} color='secondary'>
            <CartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DesktopMenu;
