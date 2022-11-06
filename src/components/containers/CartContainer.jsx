import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import emptyCart from "../../assets/images/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [subTotal, setSubTotal] = useState();
  const delivery = 2;
  const [total, setTotal] = useState();

  const [{ cartShow, cartItems, qtyChange }, dispatch] = useStateValue();

  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: false,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    dispatch({
      type: actionType.SET_QTY_CHANGE,
      qtyChange: 0,
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  useEffect(() => {
    console.log(cartItems, qtyChange);
    const cartTotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setSubTotal(cartTotal);
    setTotal(cartTotal + delivery);
  }, [cartItems, qtyChange]);

  return (
    <div
      className={`${
        cartShow ? "right-0" : "-right-[100%]  md:-right-[376px]"
      } fixed top-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-50 duration-300 transition-all`}
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer"
          onClick={hideCart}
        >
          <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
        </motion.div>
        <p className="text-textColor text-xl font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart items section */}
          <div className="w-full h-340 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-thin">
            {/* cart item */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          {/* total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-1 ">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {subTotal}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ {delivery}</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ {total}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg mt-2 hover:shadow-lg"
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
          <img src={emptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
