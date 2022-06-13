import { Box, Button, CircularProgress, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import type { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RequestStatus } from '../../model/RequestStatus';
import { signIn } from '../../redux/auth.slice';
import { InputField } from '../atoms/InputField';

interface FormFields {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, status } = useAppSelector((state) => state.auth);
  const { handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(signIn(data));
  };

  const isLoading = status === RequestStatus.Loading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === RequestStatus.Failed && (
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      )}

      <InputField required control={control} name="email" label="Email" type="email" />
      <InputField required control={control} name="password" label="Password" type="password" />
      <Box textAlign="right" fontSize={16}>
        <Link>Forgot Password?</Link>
      </Box>
      <Box component="footer" marginTop={5}>
        <Button
          color="primary"
          disabled={isLoading}
          size="large"
          startIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : null}
          type="submit"
          variant="contained"
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};
