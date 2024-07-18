export class Octokit {
  rest = {
    repos: {
      get: jest.fn().mockResolvedValue({
        data: {
          full_name: "mock/repo",
          description: "Mock repository",
          open_issues_count: 0,
          forks_count: 0,
          stargazers_count: 0,
          watchers_count: 0,
        },
      }),
      getReadme: jest.fn().mockResolvedValue({
        data: "<h1>Mock README</h1>",
      }),
    },
  };
}
