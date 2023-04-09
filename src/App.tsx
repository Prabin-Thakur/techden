import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Initialize from "./Initialize";

const App: React.FC = () => {
  Initialize();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
