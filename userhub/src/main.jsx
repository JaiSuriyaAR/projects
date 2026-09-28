import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import store from './store';
import App from './App';
import './index.css';

function WaitForStore({ children }) {
  const rehydrated = useStoreRehydrated();
  return rehydrated ? children : <p style={{ padding: '2rem' }}>Loading...</p>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <WaitForStore>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WaitForStore>
    </StoreProvider>
  </React.StrictMode>
);