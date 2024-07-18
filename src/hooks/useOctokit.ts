import { useEffect, useState } from "react";

import { OctokitService } from "../services/OctokitService";

const octokitService = OctokitService.getInstance();

const useOctoKit = () => {
    const [repoDetails, setRepoDetails] = useState<any | null>(null);

    useEffect(() => {
        async function fetchRepoDetails() {
            try {
                const data = await octokitService.getRepoDetails('facebook', 'react');
                setRepoDetails(data);
            } catch (error) {
                console.error("Error fetching repository details:", error);
            }
        }
        fetchRepoDetails();
    }, []);

    return {
        repoDetails
    }
}

export default useOctoKit;