import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      // type: "dark",
    },
    // breakpoints: {
    //   values: {
    //     xsm: 320,
    //   },
    // },
  })
);

export default theme;
