import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { ThemeProvider } from './core/providers/ThemeProvider';
import { startMockServiceWorker } from './services/mock/mockHandlers';
import { ENABLE_MOCK } from './shared/utils/constants';

// Start Mock Service Worker if enabled
if (ENABLE_MOCK) {
  startMockServiceWorker().catch((error) => {
    console.error('Failed to start Mock Service Worker:', error);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
