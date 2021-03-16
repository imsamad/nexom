import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/utils";
import SwipeableViews from "react-swipeable-views";
import attachQty from "../../utils/attachQty";

import {
  Tab,
  Tabs,
  Divider,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";

import Address from "./Address";
import OrderList from "./OrderList";
import useUser from "../../lib/useUser";
import TabPanel from "./TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "500px",
  },
  tabs: {
    backgroundColor: "#ddd",
  },
}));

export default function Profile({ orders }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Typography variant='h5' align='center' gutterBottom>
        My Profile
      </Typography>
      <div className={classes.root}>
        <Divider />
        <Tabs
          id='profile-tab'
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'
          className={classes.tabs}
        >
          <Tab label='Orders' id='order' />
          <Tab label='Address' id='address' disabled />
          <Tab label='Account Setting' id='accountsetting' disabled />
        </Tabs>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <OrderList orders={orders} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Address />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Account Setting
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
}
