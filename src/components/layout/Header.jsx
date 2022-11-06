import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";

import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const loginHandler = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(ReferenceError, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    setIsMenu(!isMenu);
  };

  const logoutHandler = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-4 md:px-16 backdrop-blur">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-9 object-cover" src={logo} alt="" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                <p className="text-sm text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
              src={user ? user.photoURL : avatar}
              alt="avatar"
              referrerPolicy="no-referrer"
              onClick={loginHandler}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
              >
                {user && user.email === "sheharyark017@gmail.com" && (
                  <Link to={"/create-item"}>
                    <p
                      className="px-4 py-2 flex items-center justify-between hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center justify-between hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer"
                  onClick={logoutHandler}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden flex w-full h-full items-center justify-between">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
            <p className="text-sm text-white font-semibold">2</p>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-9 object-cover" src={logo} alt="" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
            src={user ? user.photoURL : avatar}
            alt="avatar"
            referrerPolicy="no-referrer"
            onClick={loginHandler}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
            >
              {user && user.email === "sheharyark017@gmail.com" && (
                <Link to={"/create-item"}>
                  <p className="px-4 py-2 flex items-center justify-between hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-slate-200 text-base duration-100 text-textColor transition-all ease-in-out cursor-pointer">
                  Home
                </li>
                <li className="px-4 py-2 hover:bg-slate-200 text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer">
                  Menu
                </li>
                <li className="px-4 py-2 hover:bg-slate-200 text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer">
                  About us
                </li>
                <li className="px-4 py-2 hover:bg-slate-200 text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer">
                  Service
                </li>
              </ul>
              <p
                className="p-2 m-1 rounded-md shadow-md flex gap-3 items-center justify-center bg-red-500 hover:bg-red-6`00 transition-all duration-100 ease-in-out text-white text-base cursor-pointer"
                onClick={logoutHandler}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
