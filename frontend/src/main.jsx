import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/auth.context';
import ThemeProvider from './context/theme.context';
import App from './App';
import 'aos/dist/aos.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from 'aos'; 

const client = new QueryClient();

const Main = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);
  

  return (
    <Router>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
