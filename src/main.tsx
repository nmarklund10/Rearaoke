import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './css/index.css';
import App from './App';
import store from './store/store';
import 'typeface-roboto';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
