import { createContext, useContext } from "react";
import ProductReducer from "./productReducer.js";
import { useReducer } from "react";

export const Product = createContext(null);
export const ProductDispatch = createContext(null);

export function Provider({ children }) {
  if (!localStorage.getItem("cartData")) {
    localStorage.setItem("cartData", JSON.stringify([]));
  }

  const initialState = JSON.parse(localStorage.getItem("cartData")) || [];

  const [items, dispatch] = useReducer(ProductReducer, initialState);

  return (
    <Product.Provider value={items}>
      <ProductDispatch.Provider value={dispatch}>
        {children}
      </ProductDispatch.Provider>
    </Product.Provider>
  );
}

export function useData() {
  return useContext(Product);
}

export function useMethods() {
  return useContext(ProductDispatch);
}
