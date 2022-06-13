import { Box, Button, Chip, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import type { FC, KeyboardEvent } from 'react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { generatePath, useHistory } from 'react-router-dom';
import { SongsApi } from '../../api/Songs.api';
import { Routes } from '../../config/Routes';
import { FullscreenOverlay } from '../atoms/FullscreenOverlay';
import { InputField } from '../atoms/InputField';
import { UploadFile } from '../atoms/UploadFile';

interface FormFields {
  description: string;
  file: File;
  tags: string[];
  title: string;
}

export const UploadForm: FC = () => {
  const history = useHistory();
  const { error, isLoading, mutate, data } = useMutation(SongsApi.upload);

  const { handleSubmit, control, setValue, watch } = useForm<FormFields>({
    defaultValues: {
      description: '',
      tags: [],
      title: '',
    },
  });
  const tags = watch('tags');

  useEffect(() => {
    if (!!data) {
      history.push(
        generatePath(Routes.Dashboard, {
          id: data.catalog_id,
        }),
      );
    }
  }, [data, history]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate(data);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key, target } = event;
    if (target instanceof HTMLInputElement) {
      if (key.toLowerCase() === 'tab' && target.value.length > 0) {
        event.preventDefault();
        setValue('tags', tags.concat([target.value]));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FullscreenOverlay open={isLoading}>Uploading your track...</FullscreenOverlay>

      {!!error && (
        <Box marginBottom={2}>
          <Alert severity="error" variant="filled">
            {String(error)}
          </Alert>
        </Box>
      )}

      <UploadFile
        control={control}
        name="file"
        rules={{
          required: true,
        }}
      />

      <InputField required control={control} name="title" label="Title" />

      <InputField required multiline rows={4} control={control} name="description" label="Description" />

      <Controller
        control={control}
        name="tags"
        render={(props) => (
          <Autocomplete<string, true, false, true>
            freeSolo
            multiple
            id="tags"
            options={[]}
            onKeyDown={handleKeyDown}
            onChange={(_, data) => props.field.onChange(data)}
            renderTags={(value, getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip color="secondary" size="small" variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => <TextField {...params} margin="normal" variant="outlined" label="Tags" />}
            value={tags}
          />
        )}
      />

      <Box component="footer" display="flex" justifyContent="flex-end" marginTop={2} style={{ gap: 10 }}>
        <Button
          onClick={() => {
            history.push(Routes.Catalog);
          }}
          size="large"
          type="submit"
          variant="contained"
        >
          Cancel
        </Button>
        <Button color="primary" size="large" type="submit" variant="contained">
          Upload
        </Button>
      </Box>
    </form>
  );
};
