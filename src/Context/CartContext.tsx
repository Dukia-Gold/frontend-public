import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

type CartContextProviderTypes = {
  children: React.ReactNode;
};

type CartContextTypes = {
  cart: any[];
  setCart: Dispatch<SetStateAction<any[]>>;
  locallyStoredCart: any[];
};

export const CartContext = createContext({} as CartContextTypes);

const CartContextProvider = ({ children }: CartContextProviderTypes) => {
  const rawCart = localStorage.getItem("cart")
    ? localStorage.getItem("cart")
    : "";

  const locallyStoredCart = rawCart ? JSON.parse(rawCart) : [];

  // States
  const [cart, setCart] = useState<any[]>(locallyStoredCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, locallyStoredCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
