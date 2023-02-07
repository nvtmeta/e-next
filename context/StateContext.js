import { toast } from "react-hot-toast";
import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //inc, des
  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const desQty = () => {
    setQty((prev) => {
      if (prev < 1) return 1;
      else {
        return prev - 1;
      }
    });
  };
  //add item into cart
  const addItem = (product, qty) => {
    const checkProductInCart = cartItems.find((cartProduct) => {
      return cartProduct?._id === product._id;
    });
    setTotalPrice((prev) => prev + product.price * qty);
    setTotalQuantities((prev) => prev + qty);
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct?._id === product._id) {
          return {
            ...cartProduct,
            qty: cartProduct.qty + qty,
          };
        }
      });

      setCartItems(updateCartItems);
    } else {
      product.qty = qty;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name}  added to the cart`);
  };

  // inc or des item qty directly on cart
  let foundProduct;
  let index;
  let cloneCartItems = _.cloneDeep(cartItems);
  console.log(cloneCartItems);
  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    if (value === "inc") {
      foundProduct.qty += 1;
      cloneCartItems[index] = foundProduct;
    } else if (value === "dec") {
      if (foundProduct.qty > 1) {
        foundProduct.qty -= 1;
        cloneCartItems[index] = foundProduct;
      }
    }
    setCartItems(cloneCartItems);
  };
  //Remove item from cart
  const onRemove = (product, id) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    index = cartItems.findIndex((product) => product._id === id);
    cloneCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(cloneCartItems);
    // const itemProduct = cartItems.find((item) => item._id === product._id);
    // const newCartItems = cartItems.filter((item, i) => {
    //   item._id !== product._id;
    // });
    // setTotalPrice((prev) => prev - itemProduct.price * itemProduct.qty);
    // setTotalQuantities((prev) => prev - itemProduct.qty);
    // setCartItems(newCartItems);
  };
  // const toggleCartItemQty = (id, value) => {
  //   itemProduct = cartItems.find((item) => item._id === id);
  //   index = cartItems.findIndex((item) => item._id === id);

  //   const newCartItems = cartItems.filter((item, i) => {
  //     item._id !== id;
  //   });
  //   //inc
  //   if (value === "inc") {
  //     setCartItems([
  //       ...newCartItems,
  //       { ...itemProduct, qty: itemProduct.qty + 1 },
  //     ]);
  //     setTotalPrice((prev) => prev + itemProduct.price);
  //     setTotalQuantities((prev) => prev + 1);
  //   }
  //   //desc
  //   else if (value === "dec") {
  //     if (itemProduct.qty > 1) {
  //       setCartItems([
  //         ...newCartItems,
  //         { ...itemProduct, qty: itemProduct.qty - 1 },
  //       ]);
  //       setTotalPrice((prev) => prev - itemProduct.price);
  //       setTotalQuantities((prev) => prev - 1);
  //     }
  //   }
  // };
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        desQty,
        addItem,
        toggleCartItemQty,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
