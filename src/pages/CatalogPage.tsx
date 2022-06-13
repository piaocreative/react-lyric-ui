import { Typography } from '@material-ui/core';
import type { FC } from 'react';
import { InnerLayout } from '../components/molecules/InnerLayout';
import { Catalog } from '../components/organisms/Catalog';

export const CatalogPage: FC = () => {
  return (
    <InnerLayout>
      <Typography gutterBottom variant="h1">My Sessions</Typography>
      <Catalog />
    </InnerLayout>
  );
};
