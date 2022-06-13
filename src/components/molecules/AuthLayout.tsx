import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import type { FC } from 'react';
import { Logo } from '../atoms/Logo';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '1024px',
  },
  bannerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(180deg, #9575CD 0%, rgba(149, 117, 205, 0.33) 100%)',
  },
  banner: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
}));

export const AuthLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.container} maxWidth={false}>
      <Box display="flex" alignItems="stretch" minHeight="100vh">
        <Box flex="0 0 540px" position="relative">
          <div className={classes.bannerOverlay} />
          <img
            alt="Auth banner"
            className={classes.banner}
            src={require('../../assets/auth.svg').default}
          />
          <Box paddingLeft={3} paddingRight={3} position="absolute" bottom="40px">
            <Logo className={classes.mb1} />
            <Typography className={classes.mb1} variant="h5">
              AI Music Assistant Tool
            </Typography>
            <Typography variant="h5">Behind the scenes of a hit song</Typography>
          </Box>
        </Box>
        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" paddingLeft={10} paddingRight={10}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};
