import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const CartItem = ({ item }) => {
  const [{ cartItems, qtyChange }, dispatch] = useStateValue();

  const updateQty = (action, id) => {
    const existingCartItemIndex = cartItems.findIndex((item) => item.id === id);
    const existingCartItem = cartItems[existingCartItemIndex];

    if (action === "add") {
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
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    if (action === "remove") {
      if (existingCartItem.qty === 1) {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        console.log("hello");

        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: updatedCartItems,
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        const updatedCartItem = {
          ...existingCartItem,
          qty: existingCartItem.qty - 1,
        };

        let updatedCartItems = cartItems;

        updatedCartItems[existingCartItemIndex] = updatedCartItem;

        console.log(updatedCartItem);
        console.log(updatedCartItems);

        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: updatedCartItems,
        });
        dispatch({
          type: actionType.SET_QTY_CHANGE,
          qtyChange: qtyChange + 1,
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    }
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item?.imageURL}
        alt=""
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {(item?.price * item?.qty).toFixed(2)}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item?.qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
