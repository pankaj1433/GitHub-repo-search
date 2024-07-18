import React from "react";
import { RouterProvider } from "react-router-dom";

import { SearchProvider } from "./context/SearchContext";

import router from "./pages";

const App = () => (
  <SearchProvider>
    <RouterProvider router={router} />
  </SearchProvider>
);

export default App;
