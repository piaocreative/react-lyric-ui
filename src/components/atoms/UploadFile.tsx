import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import classNames from 'classnames';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Pick<UseControllerProps<TFieldValues, TName>, 'rules'> {
  control: Control<TFieldValues>;
  name: TName;
}
const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 8,
    border: `2px dashed ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    transition: 'all 0.2s',
  },
  active: {
    backgroundColor: 'rgba(165,138,213,0.2)',
  },
  invalid: {
    borderColor: theme.palette.error.main,
  },
  input: {
    display: 'none',
  },
}));

export function UploadFile<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, rules = {} }: Props<TFieldValues, TName>) {
  const [fileName, setFileName] = useState<string>();
  const classes = useStyles();
  const {
    field: { onChange },
    fieldState: { invalid },
  } = useController({
    control,
    name,
    rules,
  });
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles?.[0];
      onChange(file);
      setFileName(file?.name)
    },
    [onChange],
  );
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      alignItems="center"
      className={classNames(classes.container, invalid && classes.invalid, isDragActive && classes.active)}
      display="flex"
      justifyContent="center"
    >
      <Box display="flex" flexDirection="column" alignItems="center" style={{ gap: '10px' }}>
        <CloudUploadIcon color="primary" style={{ fontSize: 60 }} />
        <Typography variant="body1">{fileName ?? 'Choose a file or Drag it here'}</Typography>
        <label htmlFor="file-upload">
          <Button component="span" color="primary" variant="contained">
            Choose file
          </Button>
        </label>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            onChange(file);
            setFileName(file?.name)
          }}
          className={classes.input}
          id="file-upload"
          type="file"
        />
      </Box>
    </Box>
  );
}
