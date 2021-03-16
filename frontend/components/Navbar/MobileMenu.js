import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LoginIcon from "@material-ui/icons/PersonAdd";
import CartIcon from "@material-ui/icons/ShoppingCart";
const MobileMenu = ({
  anchorEl,
  open,
  handleMobileMenuClose,
  isLoggedIn,
  logout,
  toggleDialog,
  handleProfileMenuOpen,
  toggleDrawer,
  user,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id='mobile-menu'
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn ? (
        <div>
          <Tooltip title='Log Out'>
            <MenuItem
              onClick={() => {
                logout();
                handleMobileMenuClose();
              }}
            >
              <IconButton color='inherit'>
                <LogOutIcon />
              </IconButton>
              <Typography variant='subtitle2' gutterBottom>
                {user}
              </Typography>
            </MenuItem>
          </Tooltip>
          <MenuItem
            onClick={(e) => {
              handleProfileMenuOpen(e);
              handleMobileMenuClose();
            }}
          >
            <IconButton color='inherit'>
              <AccountCircle />
            </IconButton>
            <p> My Profile</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem
          onClick={() => {
            toggleDialog();
            handleMobileMenuClose();
          }}
        >
          <IconButton color='inherit'>
            <LoginIcon />
          </IconButton>
          <p> Log In</p>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          toggleDrawer();
          handleMobileMenuClose();
        }}
      >
        <IconButton color='inherit'>
          <CartIcon />
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
