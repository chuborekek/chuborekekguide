import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '10px', 
  },
  marginBottom: {
    marginBottom: '30px', 
  },
  list: {
    height: '75vh', overflow: 'auto', marginTop: '5px',
  },
  titleheading: {
    padding:'5px 0px 5px 15px', 
    borderBottom:'2px solid gray',
    boxShadow: '-1px 4px 17px 0px rgba(0,0,0,0.75)',
    borderRadius:'5px'
  }
}));