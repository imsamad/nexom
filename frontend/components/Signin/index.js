import { logInitialValues, validationSchema, logSchema } from "./formModel";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { API_URL } from "../../utils/utils";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import useUser from "../../lib/useUser";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import Progress from "../Progress";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderRadius: 20,
    width: 300,
    position: "relative",
    padding: theme.spacing(3, 2),
  },
  cross: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  field: {
    padding: theme.spacing(2, 0),
  },
  signup: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
const { formId, identifier, password, username, email } = logSchema;
const index = ({ open, close }) => {
  const { mutateUser } = useUser();
  const [progress, setProgress] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [err, setErr] = useState();
  const _handleSubmit = async (values) => {
    setProgress(true);

    try {
      const { identifier, username, password, email } = values;
      const body = signUp
        ? { username, password, email }
        : { identifier, password };
      const url = `${API_URL}/auth/local`;
      const res = await fetch(signUp ? `${url}/register` : url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        const error = new Error();
        error.data = data;
        throw error;
      }
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      mutateUser("/api/user");
      setProgress(false);
      close();
    } catch (err) {
      setProgress(false);
      if (!signUp) {
        setErr("Invalid credentials");
      }
      setErr(err.data.data[0].messages[0].message);
    }
  };
  const cls = useStyles();
  const initialValues = !signUp ? logInitialValues[0] : logInitialValues[1];
  const validSchema = !signUp ? validationSchema[0] : validationSchema[1];
  return (
    <>
      <Dialog disableBackdropClick={true} onClose={close} open={open}>
        <div className={cls.wrapper}>
          <Progress open={progress} />
          <IconButton onClick={close} className={cls.cross} color='inherit'>
            <CancelIcon />
          </IconButton>
          <DialogTitle id='simple-dialog-title' align='center'>
            {signUp ? "Sign Up" : "Login"}
          </DialogTitle>
          {err && (
            <Typography variant='caption' color='secondary'>
              {err}
            </Typography>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {signUp ? (
                  <>
                    <SignUpForm
                      field={cls.field}
                      username={username}
                      email={email}
                      password={password}
                    />{" "}
                    <Typography variant='caption'>
                      Have an Account ?{" "}
                    </Typography>{" "}
                    <Typography
                      display='inline'
                      variant='subtitle2'
                      className={cls.signup}
                      color='primary'
                      onClick={() => setSignUp(false)}
                    >
                      Sign In
                    </Typography>
                  </>
                ) : (
                  <>
                    <LoginForm
                      field={cls.field}
                      identifier={identifier}
                      password={password}
                    />
                    <Typography variant='caption'>New customer ? </Typography>{" "}
                    <Typography
                      display='inline'
                      variant='subtitle2'
                      className={cls.signup}
                      color='primary'
                      onClick={() => setSignUp(true)}
                    >
                      Sign Up
                    </Typography>
                  </>
                )}

                <DialogActions>
                  <Button disabled={isSubmitting} type='submit'>
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </>
  );
};

export default index;

index.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
