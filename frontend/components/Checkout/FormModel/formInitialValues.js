import checkoutFormModel from './CheckOutSchema';
const {
  formField: {
    firstName,
    lastName,
    address1,
    address2,
    city,
    zipcode,
    state,
    country,
    nameOnCard,
    cardNumber,
    expiryDate,
    cvv,
    paymentMethod,
  },
} = checkoutFormModel;
export default [
  {
    [firstName.name]: 'Abdus',
    [lastName.name]: 'Samad',
    [address1.name]: 'On Cantt Road',
    [address2.name]: 'Near V-Mart',
    [city.name]: 'Roorkee',
    [zipcode.name]: '60000',
    [country.name]: '',
    [state.name]: '',
  },
  {
    [paymentMethod.name]: '',
  },
  // {
  //   [nameOnCard.name]: "Abdus Samad",
  //   [cardNumber.name]: "4111111111111",
  //   [expiryDate.name]: "12/25",
  //   [cvv.name]: "311",
  // },
];

// export default {
//   firstName: "",
//   lastName: "",
//   address1: "",
//   city: "",
//   zipcode: "",
//   country: "",
//   useAddressForPaymentDetails: false,
//   nameOnCard: "",
//   cardNumber: "",
//   expiryDate: "",
//   cvv: "",
// };
