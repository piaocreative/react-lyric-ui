import type { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Routes } from '../../config/Routes';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getIsAuthorized } from '../../redux/auth.slice';

export const PrivateRoute: FC<RouteProps> = (props) => {
  const isAuthorized = useAppSelector((state) => getIsAuthorized(state.auth));

  if (!isAuthorized) {
    return <Redirect to={Routes.Login} />;
  }

  return <Route {...props} />;
};
