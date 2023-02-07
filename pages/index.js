import React from "react";
import { Product, Footer, Banner, FooterBanner, Layout } from "../components";
import { client } from "@/lib/client";
const Home = ({ products, banner }) => {
  console.log(products);
  return (
    <>
      <Banner banner={banner.length && banner[0]} />
      <div className="products-heading">
        <h1>Top seller products</h1>
        <p>Buy now and enjoy your product in the summer</p>
      </div>
      <div className="products-container">
        {products?.map((prod) => (
          <Product key={prod._id} product={prod} />
        ))}
      </div>  
      <FooterBanner footerBanner={banner && banner[0]} />
    </>
  );
};
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);
  return {
    props: { products, banner },
  };
};
export default Home;
