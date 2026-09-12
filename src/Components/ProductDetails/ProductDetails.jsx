import React, { useContext, useEffect, useState } from "react";
// import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { ProductsContext } from "../../Context/ProductsContext";
import useProducts from "../../Hooks/useProducts";

export default function ProductDetails() {
  // عشان اجيب ال id من ال url
  let { id } = useParams();
  let { productsQuery, productQuery } = useProducts(id);
  let { data: products, isLoading: productsLoading } = productsQuery;
  let { data: productDetails, isLoading: productLoading } = productQuery;

  // console.log(products);

  // const [productDetails, setProductDetails] = useState({});
  // const [loading, setLoading] = useState(false);
  const [activeImg, setActiveImg] = useState(
    productDetails?.data?.imageCover || productDetails?.data?.images?.[0],
  );
  const [isAddingBtn, setIsAddingBtn] = useState(false);

  const { addToCart } = useContext(CartContext);

  // let { getSpecificProduct, isLoading } = useContext(ProductsContext);

  // console.log(id);

  // async function getProductDetails(id) {
  //   let { data } = await getSpecificProduct(id);

  //   // console.log(data);
  //   setProductDetails(data);
  //   setActiveImg(data?.imageCover || data?.images?.[0]);

  //   // setLoading(true);

  //   // try {
  //   //   let { data } = await axios.get(
  //   //     `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  //   //   );
  //   //   // console.log(data);
  //   //   setProductDetails(data.data);
  //   //   setActiveImg(data.data?.imageCover || data.data?.images?.[0]);
  //   // } catch (error) {
  //   //   console.error("Error fetching product details:", error);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // }

  // useEffect(() => {
  //   getProductDetails(id);
  // }, [id]);

  // let catName = productDetails.category?.name;
  // // console.log(catName);

  // // عشان نجيب منتجات عشان تتعرض فى ال related products تحت
  // const [relatedProducts, setRelatedProducts] = useState([]);

  // async function getRelatedProducts(catName) {
  //   if (!catName) return;
  //   let {data} = await getAllProducts();
  //   setRelatedProducts(
  //     data.filter((product) => product.category.name === catName),
  //   );
  // }

  // useEffect(() => {
  //   getRelatedProducts(catName);
  // }, [catName]);

  // let { data } = useProducts();

  let relatedProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.category?.name === productDetails?.data?.category?.name &&
          product.id !== productDetails?.data?.id,
      )
    : [];

  // let filteredProducts = products.filter(
  //   (product) => product.category.name === "Electronics",
  // );
  // console.log(filteredProducts);

  // تحميل الصور
  // const [imagesLoaded, setImagesLoaded] = useState(false);

  // دالة إضافة المنتج إلى السلة
  async function handleAddToCart(productId) {
    if (addToCart) {
      setIsAddingBtn(true);
      await addToCart(productId);
      setIsAddingBtn(false);
    }
  }

  useEffect(() => {
    const mainImage =
      productDetails?.data?.imageCover || productDetails?.data?.images?.[0];
    if (mainImage) {
      setActiveImg(mainImage);
    }
  }, [productDetails, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div className="">
        {/* <h1
        className="bg-black text-center text-white text-3xl"
        style={{ marginTop: "63px" }}
      >
        ProductDetails
      </h1> */}

        <div className="relative overflow-hidden mb-4 py-5 px-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-slate-900">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 ">
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs md:text-base uppercase tracking-widest font-extrabold text-indigo-600">
                Product Details
              </span>
            </div>
          </div>
        </div>

        {productLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm animate-pulse">
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="w-full h-[350px] sm:h-[420px] bg-slate-200 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-20 bg-slate-200 rounded-xl"></div>
                <div className="h-20 bg-slate-200 rounded-xl"></div>
                <div className="h-20 bg-slate-200 rounded-xl"></div>
                <div className="h-20 bg-slate-200 rounded-xl"></div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between h-full py-4">
              <div className="flex flex-col gap-4">
                <div className="w-24 h-6 bg-slate-200 rounded-full"></div>
                <div className="w-3/4 h-8 bg-slate-200 rounded-lg"></div>
                <div className="w-full h-4 bg-slate-200 rounded mt-2"></div>
                <div className="w-5/6 h-4 bg-slate-200 rounded"></div>
                <div className="w-2/3 h-4 bg-slate-200 rounded"></div>

                <div className="flex items-center justify-between py-4 my-2 border-y border-slate-100">
                  <div className="w-20 h-8 bg-slate-200 rounded-lg"></div>
                  <div className="w-16 h-8 bg-slate-200 rounded-xl"></div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full h-12 bg-slate-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="relative w-full h-[350px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-4">
                <img
                  src={activeImg || productDetails?.data.imageCover}
                  alt={productDetails?.data.title}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                  // onLoad={() => setImagesLoaded(true)}
                />
              </div>

              {productDetails?.data?.images?.length > 1 && (
                <div className="w-full">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={4}
                    className="py-1"
                  >
                    {productDetails?.data?.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <button
                          type="button"
                          onClick={() => setActiveImg(image)}
                          className={`w-full h-auto rounded-xl overflow-hidden border-2 p-1 transition-all ${
                            activeImg === image
                              ? "border-indigo-600 shadow-md"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
                  {productDetails?.data?.category?.name}
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-snug">
                  {productDetails?.data?.title}
                </h2>

                <p className="my-4 text-sm text-slate-500 leading-relaxed">
                  {productDetails?.data?.description}
                </p>

                <div className="flex items-center justify-between py-4 my-2 border-y border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">
                      Price
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {productDetails?.data.price}{" "}
                      <span className="text-sm font-semibold text-indigo-600">
                        EGP
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60">
                    <i className="fas fa-star text-amber-500 text-sm"></i>
                    <span className="text-xs font-bold text-slate-800">
                      {productDetails?.data?.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleAddToCart(productDetails?.data?.id)}
                  disabled={isAddingBtn}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isAddingBtn ? (
                    <i className="fa-solid fa-spinner fa-spin text-lg"></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span>Add To Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Related Product */}
        {productsLoading ? (
          <div className="mt-14 animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="w-24 h-4 bg-slate-200 rounded mb-1"></div>
                <div className="w-44 h-7 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-3 border border-slate-200/80 flex flex-col gap-3"
                >
                  <div className="w-full h-40 bg-slate-200 rounded-xl"></div>
                  <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="w-12 h-4 bg-slate-200 rounded"></div>
                    <div className="w-8 h-4 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          relatedProducts.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Recommendations
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    Related Products
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rel-prev flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </button>
                  <button
                    type="button"
                    className="rel-next flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".rel-next",
                  prevEl: ".rel-prev",
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                loop={relatedProducts?.length > 4}
                spaceBetween={16}
                breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 12 },
                  640: { slidesPerView: 3, spaceBetween: 16 },
                  768: { slidesPerView: 4, spaceBetween: 16 },
                  1024: { slidesPerView: 5, spaceBetween: 20 },
                }}
                className="py-2"
              >
                {relatedProducts.map((product, index) => (
                  <SwiperSlide key={product.id || index}>
                    <Link
                      to={`/productdetails/${product.id}`}
                      className="group flex flex-col bg-white rounded-2xl p-3 border border-slate-200/80 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300"
                    >
                      <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center mb-3">
                        <img
                          src={product.imageCover}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          alt={product.title}
                        />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {product.title?.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-black text-slate-900">
                          {product.price} EGP
                        </span>
                        <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                          <i className="fas fa-star text-[10px]"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )
        )}
      </div>
    </>
  );
}
