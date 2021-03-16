import SuccessPage from "../components/Success";
import withSession from "../lib/session";
import { NextSeo } from "next-seo";
const success = ({ data }) => {
  return (
    <div>
      <NextSeo title={data ? "Payment Success" : "Payment Failed"} />
      <SuccessPage order={data.order} />
    </div>
  );
};
export const getServerSideProps = withSession(async (ctx) => {
  const {
    req,
    query: { session_id },
  } = ctx;
  const user = req.session.get("nextecomm");
  if (!user.isLoggedIn || !session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const API_URL =
    process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;
  const res = await fetch(`${API_URL}/orders/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.jwt}`,
    },
    body: JSON.stringify({ checkout_session: session_id }),
  });
  const data = await res.json();
  const { reConfirming } = data;
  if (reConfirming) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  } else {
    return {
      props: { data },
    };
  }
});
export default success;
