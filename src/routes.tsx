import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import Missing from "./components/Missing/Missing";
import Home from "./views/Home/Home";
import Product from "./views/Product/Product";
import Products from "./views/Products/Products";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import Cart from "./components/Cart/Cart";
import { useAppSelector } from "./redux/hooks";
import SnackBar from "./components/SnackBar/SnackBar";
import { LocalStorageProvider } from "./context/localStorageContext";
import Favourites from "./components/Favourites/Favourites";
import SearchedProducts from "./views/SearchedProducts/SearchedProducts";
import Category from "./views/Category/Category";
import LoginPage from "./views/LoginPage/LoginPage";
import { Navigate } from "react-router-dom";

const RootLayout = () => {
  const cart: boolean = useAppSelector((state) => state.cart) || false;

  return (
    <LocalStorageProvider>
      <div className="app">
        <NavBar />
        {cart && <Cart />}
        <SideBar />
        <Outlet />
        <Footer />
        <SnackBar />
      </div>
    </LocalStorageProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Category />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/search/:query" element={<SearchedProducts />} />
      <Route
        path="/login"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <Navigate to="/" />
          ) : (
            <LoginPage
              bigText="Log in to Account"
              buttonText="Log In"
              googlebuttonText="Log in with"
              linkBeforeText="Don't have an account ?"
              linkText="Sign Up"
            />
          )
        }
      />
      <Route
        path="/signup"
        element={
          localStorage.getItem("isLoggedIn") === "true" ? (
            <Navigate to="/" />
          ) : (
            <LoginPage
              bigText="Sign in to Account"
              buttonText="Create Account"
              googlebuttonText="Sign up with"
              linkBeforeText="Have an account ?"
              linkText="Log In"
            />
          )
        }
      />
      <Route path="*" element={<Missing />} />
    </Route>
  )
);

export { router };

// interface RouteElement {
//   path: string;
//   component: JSX.Element;
// }

// interface Route {
//   path: string;
//   element: JSX.Element;
//   children: RouteElement[];
// }

// const routes: Route[] = [
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         component: <Home />,
//       },
//       {
//         path: "/home",
//         component: <Home />,
//       },
//       {
//         path: "/products",
//         component: <Products />,
//       },
//       {
//         path: "/product/:id",
//         component: <Product />,
//       },
//       {
//         path: "*", // catch-all route for 404 errors
//         component: <Missing />,
//       },
//     ],
//   },
// ];

// const router = createBrowserRouter(routes);
