import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { GenreProvider } from './contexts/GenreContext';
import { PageProvider } from './contexts/PageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DescribeProvider } from './contexts/DescribeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GenreProvider>
    <PageProvider>
    <ThemeProvider>
    <DescribeProvider>
     <App />
     </DescribeProvider>
     </ThemeProvider>
    </PageProvider>
    </GenreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
