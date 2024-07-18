import React, { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {location.pathname !== "/" && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <IconButton edge="start" color="inherit" aria-label="github">
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub Repo Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>
    </>
  );
};

export default PageWrapper;
