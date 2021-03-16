import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";

export default function CheckboxField(props) {
  const { label, ...rest } = props;
  const fil = useField(props);
  const [field, { touched, error }, { setValue }] = fil;
  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={
          <Checkbox {...field} onChange={(e) => setValue(e.target.checked)} />
        }
        label={label}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
