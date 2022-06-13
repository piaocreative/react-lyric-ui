import { Box, Container } from '@material-ui/core';
import type { FC } from 'react';
import { Header } from './Header';

export const InnerLayout: FC = ({ children }) => {
  return (
    <Box minWidth={1024}>
      <Header />
      <Container maxWidth={false}>
        <Box paddingTop={4}>{children}</Box>
      </Container>
    </Box>
  );
};
