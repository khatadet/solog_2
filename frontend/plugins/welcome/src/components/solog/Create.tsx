import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Content, Header, Page, pageTheme, ContentHeader, } from '@backstage/core';
import {
  TextField,
  FormControl,
  Button,
  Avatar,

} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import Swal from 'sweetalert2';
import CardMedia from '@material-ui/core/CardMedia';
import {BackendURL} from '../../backend'
// header css
const HeaderCustom = {
  minHeight: '50px',
};



// css style 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(3),
    width: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '25ch',
  },


  margin: {
    margin: theme.spacing(3),
  },
  input: {
    display: 'none',
  },

}));


const NewPatientright: FC<{}> = () => {
  const classes = useStyles();



  // Lifecycle Hooks
  useEffect(() => {


  }, []);



  




  

  return (
    <Page theme={pageTheme.home}>
      <Header style={HeaderCustom} title={`ตรวจโรคพืช`}>
        <Avatar alt="Remy Sharp" />
        <div style={{ marginLeft: 10 }}></div>
      </Header>
      <Content>
        <ContentHeader title="ข้อมูล">
        </ContentHeader>

        <div className={classes.root}>
          <form noValidate autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
              
            </FormControl>
          </form>
        </div>


      </Content>
    </Page>
  );
};
export default NewPatientright;