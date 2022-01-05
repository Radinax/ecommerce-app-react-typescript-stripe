import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

const FormInput: React.FC<Props> = ({ name, label, required = true }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            fullWidth
            value={value}
            name={name}
            label={label}
            required={required}
          />
        )}
        control={control}
        name={name}
      />
    </Grid>
  );
};

export default FormInput;
