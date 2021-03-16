import ProductDetail from "../../components/ProductDetail";
import { NextSeo } from "next-seo";
const pid = ({ product }) => {
  const seo = {
    title: product?.name,
    description: product?.description,
  };

  return (
    <>
      <NextSeo {...seo} />
      <ProductDetail product={product} />
    </>
  );
};
  const url =
    process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;

export const getStaticPaths = async () => {
  const res = await fetch(`${url}/products`);
  const data = await res.json();
  const paths = data.map((pro) => ({ params: { pid: pro.slug } }));
  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps(ctx) {
  try{
  const { params }=ctx 
  const res = await fetch(`${url}/products?slug=${params.pid}`);
  const product = await res.json(); 
  if(!res.ok || product.length===0 ){
    throw new Error()
  }
  return {
    props: {
      product: product[0],
    },
      revalidate: 1,
  };

  }catch(err){
return {
      redirect: {
        destination: "/",
        permanent: false,
      }, //Redirecting at build-time is currently not allowed and if the redirects are known at build-time they should be added in next.config.js.
    };
  }
}
export default pid;
