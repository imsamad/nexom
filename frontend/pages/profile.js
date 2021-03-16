import Profile from "../components/Profile";
import withSession from "../lib/session";
import { NextSeo } from "next-seo";
const profile = ({ orders }) => {
  return (
    <>
      <NextSeo title='My Profile' />
      <Profile orders={orders} />
    </>
  );
};
export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get("nextecomm");
  const API_URL =
    process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;
  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const res2 = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.jwt}`,
    },
  });
  const orders = await res2.json();
  console.log("Orders", orders, "orders");
  return {
    props: { orders },
  };
});

export default profile;
