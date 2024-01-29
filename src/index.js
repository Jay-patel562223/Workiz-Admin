import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { DarkModeContextProvider } from './context/DarkModeContext';
import { Provider } from 'react-redux';
import store from './redux/storeConfig/store';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
        <DarkModeContextProvider> 
          <App />
        </DarkModeContextProvider> 
      </Provider>
  </BrowserRouter>
  
);
