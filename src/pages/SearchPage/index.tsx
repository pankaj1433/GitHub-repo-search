import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Select,  { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSeach";
import { Repository } from "../../types/gitRepository";

const SearchPage: React.FC = () => {
  const { query, setQuery, searchResults, page, setPage, perPage, setPerPage } =
    useSearch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handlePerPageChange = (
    event: SelectChangeEvent<number>,
  ) => {
    setPerPage(Number(event.target.value));
  };

  return (
    <Box mt={4}>
      <TextField
        fullWidth
        label="Enter repository name..."
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        margin="normal"
      />
      {searchResults ? (
        <Box mt={4}>
          {searchResults.items.map((repo: Repository) => (
            <Card key={repo.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {repo.full_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="textSecondary">
                  {repo.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/search/repo-detail/${repo.owner.login}/${repo.name}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pagination
              count={Math.ceil(searchResults.total_count / perPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
            <Select
              value={perPage}
              onChange={handlePerPageChange}
              displayEmpty
              inputProps={{ "aria-label": "Items per page" }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
        </Box>
      ) : (
        <Typography mt={2}>No results</Typography>
      )}
    </Box>
  );
};

export default SearchPage;
