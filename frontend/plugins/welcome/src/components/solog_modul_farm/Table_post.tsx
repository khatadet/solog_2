import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import CardMedia from '@material-ui/core/CardMedia';
import BackupTwoToneIcon from '@material-ui/icons/BackupTwoTone';
import AddIcon from '@material-ui/icons/Add';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import {
    TextField,
    FormControl,
    Button,
    Avatar,

} from '@material-ui/core';
import moment from 'moment';
import { SiTeradata } from 'react-icons/si';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(2),


    },
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(3),
        width: 200,
    },
    root: {
        // width: '100%',
        maxWidth: 360,
        minWidth: 360,

        backgroundColor: theme.palette.background.paper,

    },
    div: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    input: {
        display: 'none',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

}));

//var arr = [0];


export default function ComponentsTable() {
    const classes = useStyles();
    var arr: [];
    var num_arr: any;
    const [num, setNum] = React.useState([]);
    const [data, setdata] = React.useState([]);
    const [data_2, setdata_2] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [open_2, setOpen_2] = React.useState(false);
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


    const handleOpen = () => {
        setOpen(true);
        setdata([])
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen_2 = () => {
        setOpen_2(true);
    };

    const handleClose_2 = () => {
        setOpen_2(false);
    };

    const onFileChange = (e: any) => {
        setdata([])
        arr = [];

        for (let i = 0; i < e.target.files.length; i++) {

            encodeFileBase64(e.target.files[i]);

        }

        //num_arr = [...num, arr]
        //console.log("num_arr1 = ", num_arr)
        setdata_2([...num, arr])
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
                setdata([...arr])
            };
            reader.onerror = (error) => {
                console.log("error: ", error);
            };
        }
    };



    const add_arr = async () => {
        
        setNum(data_2);
        setdata([])
        
    }

    const Delete_arr = async (i: any) => {

        
        let d = data_2.filter(function (ele, ind) {
            
            return ind != i;
        })
        
        setNum(d);
        setdata(d)
      
        

    }

    const make_item = () => {
        return (
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Upload Data</h2>

                    <input className={classes.input} type="file" id="icon-button-file" onChange={onFileChange} multiple />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <BackupTwoToneIcon />
                        </IconButton>
                    </label>
                    <Tooltip title="Add" aria-label="add" onClick={() => { add_arr(); handleClose();}}>

                        <Fab color="primary" className={classes.fab}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Grid container spacing={3}>
                        {
                            data.slice(0, 36).map((item: any) => (
                                <Grid item xs={2}>
                                    <Avatar alt="Remy Sharp" src={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </Fade>
        )
    }
    const edit_item = (item: any, index: any) => {
        return (
            <Fade in={open_2}>
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">edit Data</h2>

                    <input className={classes.input} type="file" id="icon-button-file" onChange={onFileChange} multiple />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <BackupTwoToneIcon />
                        </IconButton>
                    </label>
                    <Tooltip title="Delete" onClick={() => {
                        Delete_arr(index);
                        handleClose_2();
                    }}>
                        
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add" aria-label="add" onClick={() => { add_arr(); }}>

                        <Fab color="primary" className={classes.fab}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    
                    <Grid container spacing={3}>
                        {
                            data.slice(0, 36).map((item: any) => (
                                <Grid item xs={2}>
                                    <Avatar alt="Remy Sharp" src={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </Fade>
        )
    }



    return (
        <div className={classes.table}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">DATA</TableCell>
                            <TableCell align="center">Result</TableCell>
                            <TableCell align="center">เพิ่มเติม</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {num.map((item: any, index: number) => (
                            <TableRow>
                                <TableCell align="center">
                                    <Grid container spacing={3}>
                                        {
                                            item.slice(0, 3).map((item_2: any) => (
                                                <Grid item xs={1}>
                                                    <Avatar alt="Remy Sharp" src={item_2} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </TableCell>
                                <TableCell align="center"> {item.length}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleOpen_2}>
                                        <EditTwoToneIcon />
                                    </IconButton>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open_2}
                                        onClose={handleClose_2}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        {edit_item(item, index)}
                                    </Modal>


                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />

            <Grid container spacing={3}>
                <Grid item xs={9} />
                <Grid item xs={3}>

                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        {make_item()}
                    </Modal>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <SendRoundedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );

}

