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
import { render } from "react-dom";

import Swal from 'sweetalert2';
import CardMedia from '@material-ui/core/CardMedia';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import {BackendURL} from '../../backend'
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

  const [blob,setBlob] =React.useState<Blob>(); 
  const [url,setUrl] = React.useState<URL>(); 
  const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
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





    const apiUrl = BackendURL+'/Respon_Ai_Array';
    
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
        setBlob(base64toBlob(data.pdf));
        let p = base64toBlob(data.pdf)
        setUrl(URL.createObjectURL(p));
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
             
              <br />

              <input className={classes.input} type="file" id="icon-button-file" onChange={onFileChange} multiple />

              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>

              <br />
              <Button
                onClick={() => {
                  CreatePatientright_2();
                }}
                variant="contained"
                color="primary"
              >
                ส่ง
              </Button>
              { url === undefined ? null : (
                <a download="Solog_Report.pdf" href={url}>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PictureAsPdfIcon />
                  </IconButton>
                </a>
                )
              }

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