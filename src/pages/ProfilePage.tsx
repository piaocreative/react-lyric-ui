import { Container } from '@material-ui/core';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { UserApi } from '../api/User.api';
import { FullscreenOverlay } from '../components/atoms/FullscreenOverlay';
import { InnerLayout } from '../components/molecules/InnerLayout';
import { UserForm } from '../components/organisms/UserForm';
import { useAppSelector } from '../hooks/useAppSelector';

export const ProfilePage: FC = () => {
  const userId = useAppSelector((state) => state.auth.userId)!;
  const { isLoading, data } = useQuery(['user', userId], () => UserApi.fetchById(userId));

  return (
    <InnerLayout>
      <FullscreenOverlay open={isLoading} />
      <Container maxWidth="md">{!!data && <UserForm user={data} />}</Container>
    </InnerLayout>
  );
};
