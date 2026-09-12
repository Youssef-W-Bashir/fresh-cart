import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  let queryClient = useQueryClient();

  const [cartItems, setCartItems] = useState(null);

  async function checkOutSession(shippingAddress, cartId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress: shippingAddress },
        { headers: headers },
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: headers },
      );

      setCartItems(data);

      toast.success(data.message, {
        duration: 1500,
        iconTheme: {
          primary: "rgb(79 70 229)",
        },
      });

      queryClient.invalidateQueries({ queryKey: ["recentCart"] });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function deletProductFromCart(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: headers },
      );

      setCartItems(data);

      queryClient.invalidateQueries({ queryKey: ["recentCart"] });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProductCount(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers: headers },
      );

      setCartItems(data);

      queryClient.invalidateQueries({ queryKey: ["recentCart"] });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        deletProductFromCart,
        updateProductCount,
        cartItems,
        setCartItems,
        checkOutSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
