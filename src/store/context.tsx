import { createContext, useState, useEffect, useContext } from "react";

const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <storeContext.Provider
      value={{
        cart,
        orders,
        setCart,
        setOrders
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  return useContext(storeContext);
};