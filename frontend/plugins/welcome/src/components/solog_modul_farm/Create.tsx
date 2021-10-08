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
import ComponanceTable from './Tables_ID';
import ComponanceTablePost from './Table_post';
import { render } from "react-dom";

import Swal from 'sweetalert2';
import CardMedia from '@material-ui/core/CardMedia';

// header css
const HeaderCustom = {
  minHeight: '50px',
};

interface res_interface {
  img?: string; 
  res?: string;
}


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




  // alert setting
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });


  // Lifecycle Hooks
  useEffect(() => {


  }, []);

  const [value, setValue] = React.useState('Controlled');
  const [value_2, setValue_2] = React.useState('');
  const [fileBase64String, setFileBase64String] = React.useState("");
  const [Base64String_Array,setBase64String_Array] = React.useState([]);
  const [Sender, setSender] = React.useState<res_interface[]>([]);
  var arr : [];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onFileChange = (e: any) => {
    console.log("e =", e.target.files.length)
    arr = [];
   
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      console.log(e.target.files[i].name);
      console.log(e.target.files[i].size);
      console.log(e.target.files[i].type);
      encodeFileBase64(e.target.files[i]);
      
    }
    setBase64String_Array(arr)
    console.log("arr = ",arr)

  };



  const encodeFileBase64 = (file: any) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        //console.log(Base64);
        //setFileBase64String(Base64 as string);
        arr.push(Base64 as string);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };


  const CreatePatientright_2 = async () => {





    const apiUrl = 'http://localhost:5000/Respon_Ai_Array';
    
    const requestOptions = {
      
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "img_arr": Base64String_Array,

        "target": "res"
      }),
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSender(data.res)
        if (data.status === true) {
          Toast.fire({
            icon: 'success',
            title: data.status_res,

          });

        } else {
          Toast.fire({
            icon: "error",
            title: data.error,
          });
        }
      });

  };

  var array_num =[20,30]
  
  const [num, setNum] = React.useState<number[]>([]);
    const add_num  = async () =>{


        //console.log("arr=",arr)
        console.log("num=",num)
        setNum(array_num);
    }

    const add_arr  = async () =>{
        //console.log("add_arr=",arr)
        await array_num.push(20)
        
    }

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
            <ComponanceTablePost></ComponanceTablePost>

            <FormControl variant="outlined" className={classes.formControl}>
             
              <br />

              
              <br />
          
            </FormControl>
          </form>
        </div>
        <br />
        <div className={classes.root}>

          <ComponanceTable sim={Sender}></ComponanceTable>

        </div>

      </Content>
    </Page>
  );
};
export default NewPatientright;