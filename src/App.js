import { Route, Routes } from "react-router";
import { AnimatePresence } from "framer-motion";

import { CreateContainer, Header, MainContainer } from "./components";
import { getAllItems } from "./utils/firebaseFunctions";
import { useEffect, useState } from "react";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState();

  const fetchData = async () => {
    setIsLoading(true);

    await getAllItems().then((data) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-16 md:mt-20 px-4 md:px-16 md:py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/create-item" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
