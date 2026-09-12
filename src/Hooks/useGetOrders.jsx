import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function useGetOrders() {
  const token = localStorage.getItem("userToken");
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
    let currentToken = localStorage.getItem("userToken");
    let currentUserId = userId;

    if (currentToken) {
      try {
        const decoded = jwtDecode(currentToken);
        currentUserId = decoded.id;
      } catch (error) {
        console.error("Invalid token during fetch:", error);
      }
    }

    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${currentUserId}`,
    );

    return response;
  }

  let response = useQuery({
    queryKey: ["getOrders", userId],
    queryFn: getOrders,
    enabled: !!userId, // لن يعمل الطلب إلا إذا كان هناك userId صحيح
    select: (data) => data?.data,
  });

  return response;
}
