import React from "react";
import data from "../../utils/data";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  const products = data.products;
  return (
    <div className="max-w-[1640px] mx-auto px-3 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
