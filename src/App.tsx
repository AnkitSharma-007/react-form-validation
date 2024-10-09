import { Box } from "@mui/material";
import NavBar from "./NavBar";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: 12 }}>
        <RegistrationForm />
      </Box>
    </>
  );
}

export default App;
