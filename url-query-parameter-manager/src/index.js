import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UrlManagerContextProvider } from './store/URLManagerContext';

ReactDOM.render(
  <UrlManagerContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UrlManagerContextProvider>,
  document.getElementById('root')
);
