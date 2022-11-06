import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }] = useStateValue();

  return (
    <section className="w-full my-6 flex" id="menu">
      <div className="flex w-full flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative
              before:absolute before:rounded-lg before:content before:w-20 before:h-[5px]
              before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
               transition-all ease-in-out duration-100 mr-auto"
        >
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                key={category.id}
                className={`${
                  filter === category.urlParamName ? "bg-red-600" : "bg-card"
                } group  hover:bg-red-600 w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col items-center justify-center gap-3`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`${
                    filter === category.urlParamName ? "bg-white" : "bg-red-600"
                  } w-10 h-10 rounded-full  group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    }  group-hover:text-textColor text-lg shadow-lg`}
                  />
                </div>
                <p
                  className={`${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } text-sm  group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
