import { useState, useEffect } from "react";
import AddressForm from "./Forms/AddressForm";
import axios from "axios";
import PayButton from "./PayButton";
import ReviewOrder from "./ReviewOrder";
import PaymentMethodForm from "./Forms/PaymentMethodForm";
import checkOutSchema from "./FormModel/CheckOutSchema";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import initialValues from "./FormModel/formInitialValues";
import validationSchema from "./FormModel/validationSchema";
import { placeOrder } from "../../utils/placeOrder";
import { useRouter } from "next/router";
const { formId, formField } = checkOutSchema;
import { API_URL as url } from "../../utils/utils";
import {
  listForOrder,
  deleteCart,
  getCartItems,
} from "../../utils/cartActions";
import useUser from "../../lib/useUser";
const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));
const _renderStepContent = (step = 0) => {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} />;
    case 1:
      return <PaymentMethodForm formField={formField} />;
    case 2:
      return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
};

const CheckOutPage = ( {user}) => {

  const router = useRouter();
  useEffect(() => {
    const isCartItems = getCartItems();
    !isCartItems && router.push("/");
  }, []);
  const steps = [
    "Shipping address",
    "Payment Method",
    "Review your order",
    "Paid",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [paymentData, setPaymentData] = useState();
  const cls = useStyles();
  const currValidationSchema = validationSchema[activeStep];
  const _handleSubmit = async (values, actions) => {
    if (activeStep === 2) {
      const items = listForOrder();
      const orderItem = placeOrder({ address: values, items });
      try {
        const res = await axios(`${url}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user}`,
          },
          data: orderItem,
        });
        const data = res.data;
        if (data.error) throw new Error();
        setPaymentData(data);
        data.sessionId && deleteCart();
        setActiveStep(activeStep + 1);
      } catch (error) {
        setActiveStep(activeStep - 2);
      }
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  const combineInitialValues = { ...initialValues[0], ...initialValues[1] };
  return (
    <>
      <Typography component='h1' variant='h4' align='center' gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={cls.stepper} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 ? (
        <PayButton data={paymentData} user={user.jwt} />
      ) : (
        <Formik
          validationSchema={currValidationSchema}
          initialValues={combineInitialValues}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className={cls.buttons}>
                  <div className={cls.wrapper}>
                    {activeStep !== 0 && (
                      <Button
                        className={cls.button}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      disabled={isSubmitting}
                      className={cls.button}
                      type='submit'
                      variant='contained'
                      color='primary'
                    >
                      {activeStep === 2 ? "Place Order" : "Next"}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={cls.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
export default CheckOutPage;
