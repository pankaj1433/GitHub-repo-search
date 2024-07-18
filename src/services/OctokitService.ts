import { Octokit } from "octokit";
import { GITHUB_TOKEN } from "../config";
import { SearchResponse } from "../types/gitRepository";

export class OctokitService {
    static instance: OctokitService;
    octokitClient!: Octokit;

    constructor() {
        if (OctokitService.instance) {
            return OctokitService.instance;
        }
        this.octokitClient = new Octokit({ auth: GITHUB_TOKEN });
        OctokitService.instance = this;
    }

    static getInstance(): OctokitService {
        if (!OctokitService.instance) {
            OctokitService.instance = new OctokitService();
        }
        return OctokitService.instance;
    }

    async getRepoDetails(owner: string, repo: string): Promise<any> {
        try {
            const response = await this.octokitClient.rest.repos.get({
                owner,
                repo,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching repository details:", error);
            throw error;
        }
    }

    async searchRepositories(query: string, page: number = 1, per_page: number = 10): Promise<SearchResponse> {
        try {
            const response = await this.octokitClient.request<any>('GET /search/repositories', {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                q: query,
                page,
                per_page
            });
            return response.data;
        } catch (error) {
            console.error("Error searching repositories:", error);
            throw error;
        }
    }
}
