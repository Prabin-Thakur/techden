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

// interface RouteElement {
//   path: string;
//   component: JSX.Element;
// }

// interface Route {
//   path: string;
//   element: JSX.Element;
//   children: RouteElement[];
// }

const RootLayout = () => {
  return (
    <div className="app">
      <NavBar />
      <SideBar />
      <Outlet />
      <Footer />
    </div>
  );
};

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="*" element={<Missing />} />
    </Route>
  )
);

// const router = createBrowserRouter(routes);

export { router };
