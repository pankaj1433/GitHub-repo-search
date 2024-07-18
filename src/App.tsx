import { RouterProvider } from "react-router-dom";

import PageWrapper from './components/PageWrapper';
import { SearchProvider } from './context/SearchContext';

import router from "./pages";

const App = () => (
  <SearchProvider>
    <PageWrapper>
      <RouterProvider router={router} />
    </PageWrapper>
  </SearchProvider>
)

export default App;
