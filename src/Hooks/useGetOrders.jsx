import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function useGetOrders() {
  let token = localStorage.getItem("userToken");
  let userId = null;

  if (token) {
    try {
      let decoded = jwtDecode(token);

      userId = decoded.id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  async function getOrders() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    );

    return response;
  }

  let response = useQuery({
    queryKey: ["getOrders", userId],
    queryFn: getOrders,
    enabled: !!userId,
    select: (data) => data?.data,
  });

  return response;
}
