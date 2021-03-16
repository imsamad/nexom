import { InputField } from "../FormFields";
const LoginForm = ({ field, identifier, password }) => {
  return (
    <>
      <div className={field}>
        <InputField name={identifier.name} label={identifier.label} fullWidth />
      </div>
      <div className={field}>
        <InputField name={password.name} label={password.label} fullWidth />
      </div>
    </>
  );
};

export default LoginForm;
