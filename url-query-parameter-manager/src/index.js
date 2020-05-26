import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import './index.css';
import App from './App';
import { UrlManagerContextProvider } from './store/URLManagerContext';

ReactDOM.render(
  <UrlManagerContextProvider>
    <Router history={createMemoryHistory()}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </UrlManagerContextProvider>,
  document.getElementById('root')
);
