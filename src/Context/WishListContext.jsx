import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  let queryClient = useQueryClient();
  const [wishListIds, setWishListIds] = useState([]);

  const getHeaders = () => ({
    token: localStorage.getItem("userToken"),
  });

  async function deleteItemFromWishList(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: getHeaders() },
      );

      if (data?.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["recentWishList"] });

        toast.success(data.message, {
          duration: 1500,
          iconTheme: {
            primary: "rgb(244 63 94)",
          },
        });
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function addToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers: getHeaders() },
      );

      if (data?.data) {
        setWishListIds(data.data);
      }

      queryClient.invalidateQueries({ queryKey: ["recentWishList"] });

      toast.success(data.message, {
        duration: 1500,
        iconTheme: {
          primary: "rgb(244 63 94)",
        },
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        wishListIds,
        deleteItemFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
