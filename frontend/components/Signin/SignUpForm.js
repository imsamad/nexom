import { InputField } from "../FormFields";
const LoginForm = ({ field, username, email, password }) => {
  return (
    <>
      <div className={field}>
        <InputField name={username.name} label={username.label} fullWidth />
      </div>
      <div className={field}>
        <InputField name={email.name} label={email.label} fullWidth />
      </div>
      <div className={field}>
        <InputField name={password.name} label={password.label} fullWidth />
      </div>
    </>
  );
};

export default LoginForm;
