import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Link from "next/link";

const ProfileMenu = ({
  anchorEl,
  open,
  handleProfileMenuClose,
  logout,
  user,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleProfileMenuClose}
      id='profile-menu'
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <List>
        <Link href='/cart'>
          <ListItem button onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <CartIcon />
            </ListItemIcon>
            <ListItemText primary='My Cart' />
          </ListItem>
        </Link>
        <Link href='/profile'>
          <ListItem button onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary='My Profile' />
          </ListItem>
        </Link>
        <ListItem
          button
          onClick={() => {
            logout();
            handleProfileMenuClose();
          }}
        >
          <ListItemIcon>
            <LogOutIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' secondary={user} />
        </ListItem>
      </List>
    </Menu>
  );
};

export default ProfileMenu;
