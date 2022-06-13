import type { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getIsAuthorized } from '../../redux/auth.slice';

interface Props extends RouteProps {
  redirect: string;
}

export const AuthRoute: FC<Props> = ({ redirect, ...rest }) => {
  const isAuthorized = useAppSelector((state) => getIsAuthorized(state.auth));

  if (isAuthorized) {
    return <Redirect to={redirect} />;
  }

  return <Route {...rest} />;
};
