import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import Link from "next/link";
import Image from "next/image";
import { Close } from "@material-ui/icons";

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  console.log(cartItems);
  return (
    <Layout title="Shopping Cart">
      {cartItems.length === 0 ? (
        <p>
          Shopping cart is empty. <Link href="/">Go to Home</Link>
        </p>
      ) : (
        <div className="max-w-[1640px] mx-auto p-4 my-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="grid md:grid-cols-4 md:grid-gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <p className="ml-2">{item.name}</p>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="text-center">
                        <Close className="cursor-pointer ml-4" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartScreen;
