import React from "react";
import { createBrowserRouter } from "react-router-dom";

import SearchPage from "./SearchPage";
import RepoDetails from "./RepoDetails";
import PageWrapper from "../components/PageWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <SearchPage />
      </PageWrapper>
    ),
  },
  {
    path: "/search/repo-detail/:owner/:repo",
    element: (
      <PageWrapper>
        <RepoDetails />
      </PageWrapper>
    ),
  },
]);

export default router;
