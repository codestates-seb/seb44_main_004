import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store/store.ts';
import { theme } from './styles/theme.ts';
import GlobalStyles from './styles/GlobalStyles.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);
