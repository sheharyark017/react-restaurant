import { motion } from "framer-motion";
import React from "react";
import delivery from "../../assets/images/delivery.png";
import heroBg from "../../assets/images/heroBg.png";
import { heroData } from "../../utils/data";

const HomeContainer = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-5">
          <div className="flex items-center justify-center gap-2 bg-orange-100 rounded-full px-2 py-1">
            <p className="text-base text-orange-500 font-semibold">
              Bike Delivery
            </p>
            <div className="w-8 aspect-square rounded-full overflow-hidden bg-white drop-shadow-xl">
              <img
                className="w-full h-full object-cover"
                src={delivery}
                alt=""
              />
            </div>
          </div>

          <p className="text-headingColor text-[2.5rem] lg:text-[3.25rem] font-bold tracking-wide md:w-[90%]">
            The Fastest Delivery in{" "}
            <span className="text-orange-600 text-[3rem] lg:text-[3.75rem]">
              Your City
            </span>
          </p>
          <p className="text-textColor text-base text-center md:text-left md:w-[80%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In beatae
            sapiente porro culpa laboriosam, repellendus voluptatibus aspernatur
            at totam eligendi fugiat dolor suscipit nobis blanditiis non
            expedita?
          </p>
          <button className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-md px-6 py-2 text-white w-full md:w-auto font-semibold hover:shadow-lg transition-all ease-in-out duration-100">
            Order Now
          </button>
        </div>
        <div className="py-2 flex-1 flex items-center relative">
          <img
            src={heroBg}
            alt="heroBg"
            className="ml-auto lg:h-570 h-420 w-full lg:w-auto"
          />
          <div className="w-full h-full absolute top-0 left-0 flex flex-wrap gap-4 justify-center items-center lg:px-26 py-4">
            {heroData &&
              heroData.map((product) => (
                <div
                  key={product.id}
                  className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col  items-center justify-center"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={product.imageSrc}
                    className=" -mt-10 lg:-mt-20 w-20 lg:w-40"
                    alt="icecream"
                  />
                  <p className=" text-base lg:text-lg text-textColor font-semibold mt-2 lg:mt-4">
                    {product.name}
                  </p>
                  <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-2 lg:my-3">
                    {product.decp}
                  </p>
                  <p className="text-sm text-headingColor font-semibold">
                    <span className="text-xs text-red-600 ">$</span>{" "}
                    {product.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
