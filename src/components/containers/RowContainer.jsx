import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import notFound from "../../assets/images/NotFound.svg";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const RowContainer = React.forwardRef(({ flag, data }, ref) => {
  const [{ cartItems, qtyChange }, dispatch] = useStateValue();

  const addToCart = (item, id) => {
    const existingCartItemIndex = cartItems.findIndex((item) => item.id === id);
    const existingCartItem = cartItems[existingCartItemIndex];

    if (existingCartItemIndex < 0) {
      console.log("hello");
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: [...cartItems, item],
      });
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
    } else {
      const updatedCartItem = {
        ...existingCartItem,
        qty: existingCartItem.qty + 1,
      };

      let updatedCartItems = cartItems;

      updatedCartItems[existingCartItemIndex] = updatedCartItem;

      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: updatedCartItems,
      });

      dispatch({
        type: actionType.SET_QTY_CHANGE,
        qtyChange: qtyChange + 1,
      });

      console.log(cartItems);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  return (
    <div
      ref={ref}
      className={`w-full my-12 flex gap-4 px-6 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="flex flex-col justify-between w-300 min-w-[300px]  md:w-320 md:min-w-[320px]  h-auto my-12 bg-cardOverlay rounded-lg p-4 backdrop-blur-lg hover:drop-shadow-lg "
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL}
                alt=""
                className="h-32 w-44 object-contain -mt-8 drop-shadow-xl"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => addToCart(item, item.id)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end  justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <img className="h-300" src={notFound} alt="" />
          <p className="text-xl text-headingColor font-semibold my-3  ">
            No Items Available
          </p>
        </div>
      )}
    </div>
  );
});

export default RowContainer;
