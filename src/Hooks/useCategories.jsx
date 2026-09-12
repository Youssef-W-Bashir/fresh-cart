import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCategories() {
  function getRecentCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let response = useQuery({
    queryKey: ["recentCategories"],
    queryFn: getRecentCategories,
    select: (data) => data?.data.data,
  });

  return response;
}
