import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { ThemeProvider } from './core/providers/ThemeProvider';
import { startMockServiceWorker } from './services/mock/mockHandlers';
import { ENABLE_MOCK } from './shared/utils/constants';

const initializeApp = async () => {
  // Start Mock Service Worker if enabled (wait for it before rendering)
  if (ENABLE_MOCK) {
    try {
      await startMockServiceWorker();
    } catch (error) {
      console.error('Failed to start Mock Service Worker:', error);
    }
  }

  // Render app only after MSW is ready
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

initializeApp();
