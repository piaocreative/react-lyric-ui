import { Box, Button, Grid } from '@material-ui/core';
import type { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../model/User';
import { InputField } from '../atoms/InputField';

interface Props {
  user: User;
}

interface FormFields {
  alias: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const UserForm: FC<Props> = ({ user }) => {
  const { handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      alias: user.creator_alias,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log('debug: data ', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <InputField control={control} label="First Name" name="firstName" />
        </Grid>
        <Grid item sm={6}>
          <InputField control={control} label="Last Name" name="lastName" />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item sm={6}>
          <InputField control={control} label="Email" name="email" />
        </Grid>
        <Grid item sm={6}>
          <InputField control={control} label="Creator Alias" name="alias" />
        </Grid>
      </Grid>
      <Box component="footer" marginTop={5}>
        <Button
          color="primary"
          // disabled={isLoading}
          size="large"
          // startIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : null}
          type="submit"
          variant="contained"
        >
          Save Changes
        </Button>
      </Box>
    </form>
  );
};
