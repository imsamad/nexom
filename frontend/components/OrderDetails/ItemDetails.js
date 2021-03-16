import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import { toMoney } from "../../utils/utils";
const ItemDetails = ({ order }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Items</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Price</TableCell>
          <TableCell align='right'>Subtotal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {order?.products ? (
          <>
            {order.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Image
                        src={product.image.url}
                        alt={product.name}
                        width='60'
                        height='60'
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='subtitle2' gutterBottom>
                        <Link href={`/product/${product.slug}`}>
                          {product.name}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell align='right'>
                  ${product.price * product.qty}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={5} />
              <TableCell colSpan={4} align='center'>
                <Typography variant='subtitle2'> Invoice</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} scope='row'>
                Subtotal
              </TableCell>
              <TableCell align='right'>${order.itemsPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Tax</TableCell>
              <TableCell align='right'>${order.taxPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Shipping</TableCell>
              <TableCell align='right'>${order.shippingPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>${order.totalPrice}</TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={4}>
              <Typography variant='h6' align='center'>
                Unable to render external view
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ItemDetails;
