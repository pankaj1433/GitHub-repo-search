import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { OctokitService } from "../../services/OctokitService";
import { Repository } from "../../types/gitRepository";

const octokitService = OctokitService.getInstance();

const RepoDetails: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const repoDetails = await octokitService.getRepoDetails(owner!, repo!);
        setRepository(repoDetails);
        try {
          const readmeContent = await octokitService.getRepoReadme(
            owner!,
            repo!,
          );
          setReadme(readmeContent);
        } catch (readmeError) {
          console.error("Error fetching README:", readmeError);
        }
      } catch (error) {
        console.error("Error fetching repository details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [owner, repo]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!repository) {
    return <Typography variant="h6">Repository not found</Typography>;
  }

  return (
    <Box mt={4} mx={2}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {repository.full_name}
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary">
            {repository.description}
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              <strong>Open Issues:</strong> {repository.open_issues_count}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Forks:</strong> {repository.forks_count}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Stars:</strong> {repository.stargazers_count}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Watchers:</strong> {repository.watchers_count}
            </Typography>
          </Box>
          {readme ? (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                README
              </Typography>
              <Divider />
              <Box mt={2}>
                <div dangerouslySetInnerHTML={{ __html: readme }} />
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary" mt={2}>
              No README available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RepoDetails;
