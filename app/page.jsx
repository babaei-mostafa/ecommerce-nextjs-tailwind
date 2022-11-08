// "use client";
// import Layout from "../components/Layout";
// import ProductsList from "../components/ProductsList";
// import Slider from "../components/Slider";

// export default function Home() {
//   return (
//     <Layout title="Home">
//       <Slider />
//       <ProductsList />
//     </Layout>
//   );
// }

import React from "react";
import ProductsList from "./components/ProductList";
import Slider from "./components/Slider";

const page = () => {
  return (
    <div>
      <Slider />
      <ProductsList />
    </div>
  );
};

export default page;
