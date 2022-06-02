import React, { useState } from 'react';
import Link from 'next/link';
import { IconButton, Toolbar, AppBar, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from './nav_css';
import useUser from '../../lib/useUser';
import SigninDialog from '../Signin';
import Drawer from '../Drawer';
// import SearchComponent from "./Search";
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
export default function PrimarySearchAppBar() {
  const { user, mutateUser } = useUser();
  const logout = async () => {
    await fetch('/api/logout');
    mutateUser();
  };
  const classes = useStyles();
  // Profile Menu
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const handleProfileMenuOpen = (event) =>
    setProfileMenuAnchor(event.currentTarget);
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
    handleMobileMenuClose();
  };
  // Mobile Size Nav
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Drawer state & function
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  // Dialog state & function
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  // This feature can be better applied wih redux.
  let cartQty = 0;
  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="fixed">
        <Toolbar variant="dense">
          <Link href="/">
            <Typography className={classes.title} variant="h6">
              NEXOM
            </Typography>
          </Link>
          <div className={classes.grow} />
          {/* <SearchComponent /> */}
          <DesktopMenu
            isLoggedIn={user?.isLoggedIn}
            handleProfileMenuOpen={handleProfileMenuOpen}
            toggleDialog={toggleDialog}
            toggleDrawer={toggleDrawer}
            badge={cartQty}
          />

          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {user?.isLoggedIn && (
        <ProfileMenu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          handleProfileMenuClose={handleProfileMenuClose}
          logout={logout}
          user={user.username}
        />
      )}
      <MobileMenu
        anchorEl={mobileMoreAnchorEl}
        open={Boolean(mobileMoreAnchorEl)}
        handleMobileMenuClose={handleMobileMenuClose}
        isLoggedIn={user?.isLoggedIn}
        user={user?.username}
        logout={logout}
        toggleDialog={toggleDialog}
        toggleDrawer={toggleDrawer}
        handleProfileMenuOpen={(event) => handleProfileMenuOpen(event)}
      />
      <Drawer toggleDrawer={() => toggleDrawer()} state={drawer} />
      <SigninDialog open={dialogOpen} close={toggleDialog} />
    </div>
  );
}
