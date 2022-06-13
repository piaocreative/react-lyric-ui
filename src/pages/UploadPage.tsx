import { Container, Grid } from '@material-ui/core';
import type { FC } from 'react';
import { InnerLayout } from '../components/molecules/InnerLayout';
import { UploadForm } from '../components/organisms/UploadForm';

export const UploadPage: FC = () => {
  return (
    <InnerLayout>
      <Container maxWidth="md">
        <Grid container>
          <Grid item sm={12}>
            <UploadForm />
          </Grid>
        </Grid>
      </Container>
    </InnerLayout>
  );
};
