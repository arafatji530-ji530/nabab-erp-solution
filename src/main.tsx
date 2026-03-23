import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { FluentProvider } from '@fluentui/react-components';
import { store } from './store';
import { nababLightTheme } from './core/theme/theme';
import App from './App';
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
      <FluentProvider theme={nababLightTheme}>
        <App />
      </FluentProvider>
    </Provider>
  </React.StrictMode>
);
