import React, { useState, useContext } from "react";
import { Search, ShoppingCartOutlined, Close } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Store} from '../utils/Store'


const Navbar = () => {
  // style
  const style = {
    rightDiv: "text-[14px] cursor-pointer ml-[25px]",
    li: "text-xl border-b p-4 mt-6",
  };

  // state
  const [nav, setNav] = useState(false);

  // context
  const {state, dispatch} = useContext(Store)
  const {cart} = state

  return (
    <div className="navbar max-w-[1640px] mx-auto px-8 h-[60px] shadow-md flex justify-between items-center relative z-10">
      {/* left div */}
      <div className="left hidden md:flex items-center">
        <div className="language cursor-pointer text-[16px]">En</div>
        <div className="searchInput flex border-[2px] border-gray-200 rounded-md items-center ml-[10px] p-[5px] focus-within:border-[#8a4af3] transition-all">
          <input
            className="input bg-transparent w-[200px] sm:w-[300px] focus:outline-none"
            type="text"
          />
          <Search style={{ fontSize: "16px" }} />
        </div>
      </div>

      {/* Logo */}
      <div className={nav ? "hidden" : "font-bold text-lg"}>Shopestoon</div>

      {/* Right Div */}
      <div className="right hidden md:flex items-center justify-end">
        <div className={style.rightDiv}>Register</div>
        <div className={style.rightDiv}>Sign In</div>
        <div className={style.rightDiv}>
          <Badge badgeContent={cart.cartItems.reduce((a,c)=>a + c.quantity, 0)} color="primary">
            <ShoppingCartOutlined />
          </Badge>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div
        className="flex md:hidden cursor-pointer z-10"
        onClick={() => setNav(!nav)}
      >
        {nav ? (
          <div>
            <Close className="absolute top-[20px] right-[20px]" />
          </div>
        ) : (
          <div>
            <MenuIcon />
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={
          nav
            ? "absolute top-0 left-0 w-screen h-[100vh] bg-gray-400/90 ease-in duration-300 md:hidden"
            : "absolute left-[-100%] md:hidden"
        }
      >
        <ul className="flex flex-col">
          <li className="mt-6">
            <div className="font-bold text-lg pl-2">Shopestoon</div>
          </li>
          <li className={style.li}>2</li>
          <li className={style.li}>3</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
