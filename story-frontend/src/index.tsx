import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { GenreProvider } from './contexts/GenreContext';
import { PageProvider } from './contexts/PageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DescribeProvider } from './contexts/DescribeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <GenreProvider>
    <PageProvider>
    <ThemeProvider>
    <DescribeProvider>
     <LoadingProvider>
     <App />
     </LoadingProvider>
     </DescribeProvider>
     </ThemeProvider>
    </PageProvider>
    </GenreProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
