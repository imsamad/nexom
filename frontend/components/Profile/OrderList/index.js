import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import {
  Paper,
  Button,
  Typography,
  makeStyles,
  Tooltip,
  Zoom,
} from "@material-ui/core";

import { truncate } from "../../../utils/utils";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function OrderList({ orders }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h6'>My Orders </Typography>
      {orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>Paid</TableCell>
                <TableCell align='right'>Delivered</TableCell>
                <TableCell align='right'>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => {
                const {
                  id,
                  createdAt,
                  totalPrice,
                  isPaid,
                  isDelived,
                  deliveredAt,
                } = order;
                return (
                  <TableRow key={id}>
                    <Tooltip title={id} TransitionComponent={Zoom}>
                      <TableCell scope='row'>{truncate(id, 10)}</TableCell>
                    </Tooltip>
                    <TableCell align='right'>
                      {createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell align='right'>
                      ${totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align='right'>{isPaid ? "Yes" : "No"}</TableCell>
                    <TableCell align='right'>
                      {isDelived ? deliveredAt : "No"}
                    </TableCell>
                    <TableCell align='right'>
                      <Link href={`/order/${id}`}>
                        <Button>View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant='h6'>You don't have any order</Typography>
      )}
    </>
  );
}
