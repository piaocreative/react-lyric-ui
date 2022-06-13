import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../components/molecules/AuthLayout';
import { RegisterForm } from '../components/organisms/RegisterForm';
import { Routes } from '../config/Routes';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
  },
}));

export const RegisterPage: FC = () => {
  const classes = useStyles();

  return (
    <AuthLayout>
      <Typography gutterBottom className={classes.title} variant="h1">
        Sign Up
      </Typography>
      <Typography gutterBottom variant="h5" color="textSecondary">
        It is a long established fact that a reader will be distracted by the readable content.
      </Typography>
      <Box marginTop={2}>
        <RegisterForm />
      </Box>
      <Box marginTop={6} component="footer">
        <Typography color="textSecondary" variant="body1">
          Already have an Account?&nbsp;
          <Link component={RouterLink} to={Routes.Login}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};
