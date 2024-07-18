import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import router from "../pages";

// Mock the Octokit module and config
jest.mock("octokit");
jest.mock("../config", () => ({
  GITHUB_TOKEN: "mock-token",
}));

const testRouter = createMemoryRouter(router.routes, {
  initialEntries: ["/"],
});

test("renders the App component and checks for initial elements", () => {
  render(
    <SearchProvider>
      <RouterProvider router={testRouter} />
    </SearchProvider>,
  );

  // Check for elements that should be present in the initial render
  expect(screen.getByText(/GitHub Repo Search/i)).toBeInTheDocument();
  expect(
    screen.getByLabelText(/Enter repository name.../i),
  ).toBeInTheDocument();
});
