import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import useSearch from '../../hooks/useSeach';
import { Repository } from '../../types/gitRepository';

const SearchPage: React.FC = () => {
  const { query, setQuery, searchResults, page, setPage, perPage, setPerPage } = useSearch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPerPage(event.target.value as number);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        GitHub Repository Search
      </Typography>
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
            <Box key={repo.id} mb={2}>
              <Typography variant="h6">{repo.full_name}</Typography>
              <Typography>{repo.description}</Typography>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Box>
          ))}
          <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
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
              inputProps={{ 'aria-label': 'Items per page' }}
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
