# FreshCart — E-Commerce Web Application

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![React Query](https://img.shields.io/badge/React_Query-TanStack-FF4154?style=for-the-badge&logo=react-query)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)

FreshCart is a modern, fully featured e-commerce single-page application built with **React** and **TanStack React Query**. It provides a seamless, fast, and responsive shopping experience with efficient server-state management, asynchronous cache syncing, and a sleek user interface.

---

## Key Features

- **Authentication & Authorization:** User registration and secure login flow powered by Formik and Yup validation.
- **Dynamic Product Catalog:** Browse products by categories, search items, view top-selling products, and inspect detailed product pages.
- **Interactive Shopping Cart:** Add, remove, and update item quantities dynamically with real-time UI synchronization and feedback.
- **Wishlist Management:** Save favorite products to a personalized wishlist for quick access later.
- **Seamless Checkout:** Integration with payment checkout sessions for order processing.
- **Order Tracking:** View order histories specific to the authenticated user.
- **Fully Responsive UI:** Optimized layout across all screen sizes (Mobile, Tablet, Desktop) built using Tailwind CSS.

---

## Tech Stack

- **Core Framework:** React.js (Powered by Vite)
- **State Management & Caching:** TanStack Query (React Query) & React Context API
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS & PostCSS
- **HTTP Client:** Axios
- **Form Handling:** Formik & Yup
- **Authentication:** JWT (JSON Web Tokens) & `jwt-decode`
- **UI Notifications:** React Hot Toast

---

## Getting Started

Ensure you have **Node.js** installed on your system before proceeding.

### 1. Clone the Repository

```bash
git clone https://github.com/Youssef-W-Bashir/fresh-cart.git
cd fresh-cart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

---

## Project Structure

```
fresh-cart/
├── public/            # Static public assets
├── src/
│   ├── assets/         # Component-specific images and icons
│   ├── Components/     # Reusable UI components (Navbar, Cart, Products, etc.)
│   ├── Context/        # Global React Contexts (UserContext, CartContext, WishListContext)
│   ├── Hooks/          # Custom React Query Hooks (useCart, useWishList, etc.)
│   ├── App.jsx          # Main Application Routing and Layout
│   └── main.jsx         # Application Entry Point & Provider Setups
├── index.html          # HTML Entry Template
├── package.json        # Project Dependencies and Scripts
└── vite.config.js       # Vite Configuration
```

---

## Live Demo

Check out the live deployment hosted on Vercel:

**[FreshCart Live Application](https://fresh-cart-rho-five.vercel.app/)**

---

## Author

**Youssef Waleed Beshir**

- **LinkedIn:** [youssef-waleed-beshir](https://www.linkedin.com/in/youssef-waleed-beshir/)
- **GitHub:** [Youssef-W-Bashir](https://github.com/Youssef-W-Bashir)
