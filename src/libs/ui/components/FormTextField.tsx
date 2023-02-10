import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

export interface FormInputProps {
  name: string;
  control: Control<any>; // eslint-disable-line
  label: string;
  type?: string;
  multiline?: number;
}

const FormTextField = ({ name, control, label, type = 'text', multiline = 0 }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        type={type}
        multiline={multiline > 0}
        {...(multiline ? { rows: multiline } : {})}
        helperText={error ? error.message : null}
        size="small"
        error={!!error}
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        variant="outlined"
      />
    )}
  />
);

export default FormTextField;
