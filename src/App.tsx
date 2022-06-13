import { CssBaseline } from '@material-ui/core';
import type { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HttpClient } from './api/HttpClient';
import { AuthRoute } from './components/atoms/AuthRoute';
import { Theme } from './components/organisms/Theme';
import { PrivateRoute } from './components/PrivateRoute';
import { Routes } from './config/Routes';
import { CatalogPage } from './pages/CatalogPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { UploadPage } from './pages/UploadPage';
import { QueryClient, QueryClientProvider } from 'react-query';

import { persistor, store } from './redux';
import { SecondaryHttpClient } from './api/SecondaryHttpClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App: FC = () => {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
            onBeforeLift={() => {
              const appState = store.getState();
              if (appState.auth.token) {
                HttpClient.setToken(appState.auth.token);
                SecondaryHttpClient.setToken(appState.auth.token);
              }
            }}
          >
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <AuthRoute exact component={LoginPage} redirect={Routes.Catalog} path={Routes.Login} />
                <AuthRoute exact component={RegisterPage} redirect={Routes.Upload} path={Routes.Register} />
                <PrivateRoute exact component={DashboardPage} path={Routes.Dashboard} />
                <PrivateRoute exact component={ProfilePage} path={Routes.Profile} />
                <PrivateRoute exact component={UploadPage} path={Routes.Upload} />
                <PrivateRoute exact component={CatalogPage} path={Routes.Catalog} />

                <Redirect to={Routes.Login} />
              </Switch>
            </BrowserRouter>
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </Theme>
  );
};
