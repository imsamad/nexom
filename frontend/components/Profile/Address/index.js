import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import initialValues from "../../Checkout/FormModel/formInitialValues";
import validationSchema from "../../Checkout/FormModel/validationSchema";
import AddressForm from "../../Checkout/Forms/AddressForm";
import AddressSchema from "../../Checkout/FormModel/CheckOutSchema";
const Address = () => {
  const _handleSubmit = (val, actions) => console.log("object", val, "object");
  const initValues = initialValues[0];
  const validSchema = validationSchema[0];
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validSchema}
      onSubmit={_handleSubmit}
    >
      <Form id='addressUpdate'>
        <AddressForm formField={AddressSchema.formField} />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default Address;
