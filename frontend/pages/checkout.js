import CheckoutForm from '../components/Checkout/index';
import withSession from '../lib/session';
import { NextSeo } from 'next-seo';
const Checkout = ({ user }) => {
  return (
    <>
      <NextSeo title="Checkout" />
      <CheckoutForm user={user.jwt} />
    </>
  );
};
export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get('nextecomm');
  if (!user?.isLoggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    return {
      props: { user },
    };
  }
});
export default Checkout;
