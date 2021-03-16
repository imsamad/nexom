import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";

import { at } from "lodash";
import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";

function RadioField(props) {
  const { data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;

  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <RadioGroup {...field} value={selectedValue ? selectedValue : ""}>
        {data.map((dt) => (
          <FormControlLabel
            key={dt.label}
            value={dt.value}
            control={<Radio />}
            label={dt.label}
            disabled={dt.disabled}
          />
        ))}
      </RadioGroup>
      {_renderHelperText()}
    </FormControl>
  );
}

RadioField.defaultProps = {
  data: [],
};

RadioField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RadioField;
