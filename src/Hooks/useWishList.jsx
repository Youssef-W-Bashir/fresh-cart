import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useWishList() {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  
  async function getRecentWishList() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers: headers,
      },
    );

    return response;
  }

  let response = useQuery({
    queryKey: ["recentWishList"],
    queryFn: getRecentWishList,
    select: (data) => data?.data?.data,
    enabled: !!headers.token,
  });

  return response;
}
