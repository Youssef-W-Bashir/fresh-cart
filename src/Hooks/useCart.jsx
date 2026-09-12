import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCart() {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getRecentCart() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: headers,
      },
    );

    return response;
  }
  
  let response = useQuery({
    queryKey: ["recentCart"],
    queryFn: getRecentCart,
    select: (data) => data?.data.data,
    enabled: !!headers.token,
  });
  
  return response;
}
