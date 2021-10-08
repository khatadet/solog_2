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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
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
  const [selectetdFile, setSelectedFile] = React.useState([]);
  const [fileBase64String, setFileBase64String] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };


  const [blob, setBlob] = React.useState<Blob>();
  const [url, setUrl] = React.useState<URL>();
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
    setSelectedFile(e.target.files);
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    console.log(e.target.files[0].size);
    console.log(e.target.files[0].type);
    encodeFileBase64(e.target.files[0]);



  };

  const encodeFileBase64 = (file: any) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64 as string);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  const CreatePatientright_2 = async () => {





    const apiUrl = BackendURL+'/Respon_Ai';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "img": fileBase64String,

        "target": "res"
      }),
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setValue_2(data.res)
        setBlob(base64toBlob(data.pdf));
        let p = base64toBlob(data.pdf)
        setUrl(URL.createObjectURL(p));
        if (data.status === true) {
          Toast.fire({
            icon: 'success',
            title: data.res,

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
              
              <img src={fileBase64String} height="240"  />
              
              <br />
              <TextField
                disabled
                multiline
                name="permission"
                label="ผลลัพธ์"
                variant="outlined"
                type="string"
                size="medium"

                value={value_2}
                onChange={handleChange}
              />
              <br />

              <input accept="image/*" className={classes.input} type="file" id="icon-button-file" onChange={onFileChange} />
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
              <br />  
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


      </Content>
    </Page>
  );
};
export default NewPatientright;