import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useBrands() {
  async function getRecentBrands() {
    let page1 = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands?page=1`,
    );
    let page2 = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands?page=2`,
    );
    return [...page1.data.data, ...page2.data.data];
  }

  let response = useQuery({
    queryKey: ["recentBrands"],
    queryFn: getRecentBrands,
  });

  return response;
}
