import { useState } from 'react';
import './App.css';
import CreateAlerts from './components/createAlerts/CreateAlerts';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayAlerts from './components/displayAlerts/DisplayAlerts';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            fontFamily: 'Zain, sans-serif !important',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Sidebar open={open} onClose={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
          >
            <Routes>
              <Route path="/" element={<DisplayAlerts />} />
              <Route path="/create" element={<CreateAlerts />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
