"use client";
import React, { useContext } from "react";
import { ACTIONS, Store } from "../../utils/Store";
import Link from "next/link";
import Image from "next/image";
import { Close } from "@material-ui/icons";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const router = useRouter();

  // remove from cart handler
  const handleRemove = (slug) => {
    dispatch({ type: ACTIONS.CART_REMOVE_ITEM, payload: slug });
  };

  // update item handler
  const handleUpdatedItem = (item, e) => {
    dispatch({
      type: ACTIONS.CART_ADD_ITEM,
      payload: {
        ...item,
        quantity: Number(e),
      },
    });
  };

  return (
    <div className="max-w-[1640px] mx-auto p-4 my-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="mt-4">
          Shopping cart is empty. <Link href="/">Go to Home</Link>
        </p>
      ) : (
        <div>
          <div className="grid md:grid-cols-4 md:grid-gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right ">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <p className="ml-2">{item.name}</p>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          name="quantity"
                          id=""
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdatedItem(item, e.target.value)
                          }
                          className="px-2 py-1"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td
                        className="text-center"
                        onClick={() => handleRemove(item.slug)}
                      >
                        <Close className="cursor-pointer ml-4" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}): $
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    className="primary-button w-full"
                    onClick={() => router.push("login?redirect=/shipping")}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
