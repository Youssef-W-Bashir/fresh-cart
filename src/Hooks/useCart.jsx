import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCart() {
  const token = localStorage.getItem("userToken");

  async function getRecentCart() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      },
    );

    return response;
  }

  let response = useQuery({
    queryKey: ["recentCart", token],
    queryFn: getRecentCart,
    select: (data) => data?.data?.data,
    enabled: !!token,
  });

  return response;
}
