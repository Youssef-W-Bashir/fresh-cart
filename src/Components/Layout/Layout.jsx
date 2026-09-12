import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container px-2 lg:px-4 mx-auto mt-[72px] md:mt-[85px] mb-10">
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  );
}
