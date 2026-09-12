import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWishList() {
  const token = localStorage.getItem("userToken");

  async function getRecentWishList() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      },
    );

    return response;
  }

  let response = useQuery({
    queryKey: ["recentWishList", token],
    queryFn: getRecentWishList,
    select: (data) => data?.data?.data,
    enabled: !!token,
  });

  return response;
}
