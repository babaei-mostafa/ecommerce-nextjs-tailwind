import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
// import React, { useContext, useState } from "react";
import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import { ACTIONS, Store } from "../../utils/Store";

const ProductDetails = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  // constext
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // state
  // const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const existItem = cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (quantity > product.countInStock) {
      alert("Out of stock");
      return;
    }
    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: { ...product, quantity },
    });
  };

  if (!product) {
    return (
      <Layout>
        <div>Product Not Found.</div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="max-w-[1640px] mx-auto px-2 my-8">
        <div className="my-2">
          <Link href="/">
            <a>Back to Home</a>
          </Link>
          <Link href="/cart">
            <a>Go to Cart</a>
          </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            />
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In stock" : "Unavailable"}
                </div>
              </div>
              <button
                className="primary-button w-full"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
