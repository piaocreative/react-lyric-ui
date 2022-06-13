import { TextField, TextFieldProps } from '@material-ui/core';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Pick<UseControllerProps<TFieldValues, TName>, 'rules'>,
    Pick<
      TextFieldProps,
      'disabled' | 'type' | 'placeholder' | 'helperText' | 'variant' | 'required' | 'margin' | 'multiline' | 'maxRows' | 'rows'
    > {
  control: Control<TFieldValues>;
  label: string;
  name: TName;
}

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  disabled = false,
  helperText,
  label,
  margin = 'normal',
  name,
  placeholder,
  required,
  rules = {},
  type = 'text',
  variant = 'outlined',
  ...rest
}: Props<TFieldValues, TName>) {
  if (required) {
    rules.required = {
      value: true,
      message: `${label} is required`,
    };
  }

  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <TextField
      fullWidth
      {...inputProps}
      {...rest}
      disabled={disabled}
      error={invalid}
      helperText={error?.message ?? helperText}
      id={name}
      inputRef={ref}
      label={label}
      margin={margin}
      placeholder={placeholder}
      required={required}
      type={type}
      variant={variant}
    />
  );
}
