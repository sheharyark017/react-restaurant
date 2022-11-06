export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_QTY_CHANGE: "SET_QTY_CHANGE",
};

const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
    };
  } else if (action.type === "SET_FOOD_ITEMS") {
    return {
      ...state,
      foodItems: action.foodItems,
    };
  } else if (action.type === "SET_CART_SHOW") {
    return {
      ...state,
      cartShow: action.cartShow,
    };
  } else if (action.type === "SET_CART_ITEMS") {
    return {
      ...state,
      cartItems: action.cartItems,
    };
  } else if (action.type === "SET_QTY_CHANGE") {
    return {
      ...state,
      qtyChange: action.qtyChange,
    };
  }
};

export default reducer;
