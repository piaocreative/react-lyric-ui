import { Box, Button, Chip, CircularProgress, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import type { FC } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { RequestStatus } from '../../model/RequestStatus';
import { signUp } from '../../redux/auth.slice';
import { addOrDelete } from '../../utils/common';
import { InputField } from '../atoms/InputField';

const GENRE_LIST: string[] = [
  'Pop',
  'Hip-Hop/Rap',
  'Rock',
  'Dance/Electronic',
  'Latin',
  'Alternative',
  'Classical',
  'K-Pop',
  'Country',
  'Metal',
];

interface FormFields {
  alias: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const RegisterForm: FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { errorMessage, status } = useAppSelector((state) => state.auth);
  const { handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      alias: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormFields> = ({ alias, email, firstName, lastName, password }) => {
    dispatch(
      signUp({
        creator_alias: alias,
        email,
        first: firstName,
        genres,
        last: lastName,
        password,
      }),
    );
  };

  const selectGenre = (genre: string) => {
    setGenres(addOrDelete(genres, genre));
  };

  const isLoading = status === RequestStatus.Loading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === RequestStatus.Failed && (
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={1}>
        <Grid item sm={6}>
          <InputField required control={control} name="firstName" label="First name" />
        </Grid>
        <Grid item sm={6}>
          <InputField required control={control} name="lastName" label="Last name" />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item sm={6}>
          <InputField required control={control} name="email" label="Email" type="email" />
        </Grid>
        <Grid item sm={6}>
          <InputField required control={control} name="password" label="Password" type="password" />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item sm={12}>
          <InputField control={control} name="alias" label="Creator Alias" />
        </Grid>
      </Grid>

      <Box marginTop={2}>
        <Typography variant="h5">Genres of Interest</Typography>
        <Box marginTop={1} display="flex" flexWrap="wrap" style={{ gap: 10 }}>
          {GENRE_LIST.map((genre) => (
            <Chip
              clickable
              color="secondary"
              key={genre}
              label={genre}
              onClick={() => selectGenre(genre)}
              size="small"
              variant={genres.includes(genre) ? 'default' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      <Box component="footer" marginTop={4}>
        <Button
          color="primary"
          disabled={isLoading}
          size="large"
          startIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : null}
          type="submit"
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
};
