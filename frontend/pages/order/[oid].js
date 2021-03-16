import withSession from "../../lib/session";
import OrderDetails from "../../components/OrderDetails";
import attchQty from "../../utils/attachQty";
import { NextSeo } from "next-seo";
const orderDetails = ({ order }) => {
  return (
    <>
      <NextSeo title={`Order No.-${order.id.substring(0, 5)}...`} />
      <OrderDetails order={order} />
    </>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const {
    req,
    params: { oid },
  } = ctx;
  const user = req.session.get("nextecomm");
  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const API_URL =
    process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;
  const res2 = await fetch(`${API_URL}/orders/${oid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.jwt}`,
    },
  });
  let order = await res2.json();
  order = attchQty(order);
  return {
    props: {
      order,
    },
  };
});
export default orderDetails;
