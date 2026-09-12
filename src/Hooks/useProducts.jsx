import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts(id) {
  async function getProducts() {
    let page1 = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=1`,
    );
    let page2 = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=2`,
    );
    return [...page1.data.data, ...page2.data.data];
  }

  let productsQuery = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
  });

  async function getSpecificProduct(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );
    return data;
  }

  let productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSpecificProduct(id),
    enabled: !!id,
  });

  return { productsQuery, productQuery };
}
