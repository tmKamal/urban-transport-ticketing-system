import React,{useContext} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { AuthContext } from '../../context/auth-context';
import CustomButton from '../../components/ui-elements/custom-btn';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SLIIT Logix (WE-24)
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Logout=()=> {

    const auth = useContext(AuthContext);
    const signout=()=>{
       console.log('whhfoa');
        
        auth.logout();
    }
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Logout 
        </Typography>
        <CustomButton onClick={signout}>Sign Me Out!</CustomButton>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Logout;