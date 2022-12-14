import React, { useRef } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems }] = useStateValue();

  const rowContainer = useRef();

  const scrollLeft = () => {
    rowContainer.current.scrollLeft += 336;
    console.log("left");
  };
  const scrollRight = () => {
    rowContainer.current.scrollLeft -= 336;
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative
              before:absolute before:rounded-lg before:content before:w-32 before:h-[5px]
              before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
               transition-all ease-in-out duration-100"
          >
            Our Fresh & Healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out cursor-pointer flex items-center justify-center"
              onClick={scrollRight}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 hover:shadow-lg transition-all duration-100 ease-in-out cursor-pointer flex items-center justify-center"
              onClick={scrollLeft}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
          ref={rowContainer}
        />
        <MenuContainer />
        <CartContainer />
      </section>
    </div>
  );
};

export default MainContainer;
