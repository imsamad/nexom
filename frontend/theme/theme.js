import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
const theme = responsiveFontSizes(
  createMuiTheme({
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
