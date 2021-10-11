import Homescreen from '../components/Homescreen';
const index = ({ products }) => {
  return <Homescreen products={products} />;
};

export async function getStaticProps() {
  const url =
    process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;

  const res = await fetch(`${url}/products`);

  const products = await res.json();
  return {
    props: { products },
    revalidate: 1,
  };
}

export default index;
