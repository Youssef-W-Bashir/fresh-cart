import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Login from "./Components/Login/Login.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import Category from "./Components/Category/Category.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import WishListContextProvider from "./Context/WishListContext.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

let query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <WishListContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
    </QueryClientProvider>
  );
}

export default App;
