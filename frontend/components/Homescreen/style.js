import { makeStyles } from '@material-ui/core';
export default makeStyles((theme) => ({
  productWrapper: {
    border: '2px solid #ddd',
    borderRadius: 8,
    height: '100%',
  },
  productimg: {
    // backgroundColor: '#f2f7f4',
    display: 'flex',
    justifyContent: 'center',
    // padding: theme.spacing(7, 3),
    // position: 'relative',
  },
  info: {
    padding: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  infoTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    color: '#40c9a2',
  },
  smTitle: {
    padding: '0.6rem 0',
    textTransform: 'capitalize',
    fontWeight: 300,
    fontSize: '1rem',
    textTransform: ' uppercase',
  },
  offInfo: {
    background: '#40c9a2',
    color: '#fff',
    display: 'inline-block',
    padding: '0.5rem',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
    // writingMode: "vertical-lr",
    // transform: "rotate(180deg)",
    zIndex: 1,
    letterSpacing: '3px',
    cursor: 'pointer',
  },
  productName: {
    color: 'black',
    display: 'block',
    textDecoration: 'none',
    fontSize: '1rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  priceCut: {
    paddingTop: '0.6rem',
    paddingRight: '0.5rem',
    display: 'inline-block',
    color: '#40c9a2',
    textDecoration: 'line-through',
  },
  price: {
    paddingTop: '0.6rem',
    paddingRight: '0.6rem',
    display: 'inline-block',
    flex: 1,
  },
  addIcon: {
    position: 'absolute',
    top: 0,
    right: 2,
    color: 'brown',
    '&:hover': {
      background: '#888',
    },
  },
  lowest: {
    display: 'flex',
    alignItems: 'center',
  },
}));
