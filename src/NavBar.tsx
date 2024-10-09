import { GitHub } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            React Form Validation
          </Typography>
          <Button
            href="https://github.com/AnkitSharma-007/react-form-validation"
            color="inherit"
            startIcon={<GitHub />}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
