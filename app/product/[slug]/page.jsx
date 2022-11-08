"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import data from "../../../utils/data";
// import Link from "next/link";
import Image from "next/image";
import { ACTIONS, Store } from "../../../utils/Store";
import Link from "next/link";

const ProductDetails = ({ params: { slug } }) => {
  const router = useRouter();
  // const { slug } = router.query;
  const product = data.products.find((x) => x.slug === slug);

  // constext
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // add to cart handler
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
    router.push("/cart");
  };

  if (!product) {
    return <div>Product Not Found.</div>;
  }

  return (
    <div className="max-w-[1640px] mx-auto px-2 my-8">
      <div className="my-2">
        <Link href="/">Back to Home</Link>
        <Link href="/cart">Go to Cart</Link>
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
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
