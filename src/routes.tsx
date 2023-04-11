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
      <Route path="/product/:id" element={<Product />} />
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
