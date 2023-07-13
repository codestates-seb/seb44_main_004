import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { VITE_OAUTH_CLIENT_ID } from './types/envVariable.ts';
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
          <GoogleOAuthProvider clientId={VITE_OAUTH_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </StyleSheetManager>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
);
