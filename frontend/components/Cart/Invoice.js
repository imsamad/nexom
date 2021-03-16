import { TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,} from "@material-ui/core"
 
const Invoice = ({cartInvoice}) => {
  const { invoiceSubtotal,
taxPrice,
shippingPrice,
totalPrice} =cartInvoice
  return (
    <TableContainer>
      <Table>
      <TableHead>
      <TableRow>
      <TableCell colSpan="2" align="center" >
      Invoice
      </TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      <Row label="Subtotal" value={invoiceSubtotal} />
      <Row label="Tax(7%)" value={taxPrice} />
      <Row label="Shhipping(0.05%)" value={shippingPrice} />
      <Row label="Total" value={totalPrice} />
      </TableBody>
      </Table>
    </TableContainer>
  );
}
const Row=({label,value})=>(
      <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell>${value}</TableCell>
      </TableRow>
)
export default Invoice;

