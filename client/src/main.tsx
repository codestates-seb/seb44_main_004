import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { store } from './store/store.ts';
import { theme } from './styles/theme.ts';
import GlobalStyles from './styles/GlobalStyles.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ReduxProvider store={store}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <App />
        </StyleSheetManager>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);
