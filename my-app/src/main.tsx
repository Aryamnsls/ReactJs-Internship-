import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import FormPage from './FormPage';
import SecondPage from './SecondPage';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
