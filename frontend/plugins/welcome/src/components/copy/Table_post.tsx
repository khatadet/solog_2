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
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onFileChange = (e: any) => {
        setdata([])
        arr = [];

        for (let i = 0; i < e.target.files.length; i++) {

            encodeFileBase64(e.target.files[i]);

        }
        
        num_arr = [...num, arr]
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

        setNum(num_arr);
        handleClose();
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
                        {num.map((item: any) => (
                            <TableRow>
                                <TableCell align="center">
                                   
                                </TableCell>
                                <TableCell align="center"> {item.length}</TableCell>
                                <TableCell align="center">

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
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h2 id="simple-modal-title">Upload Data</h2>
                                <Grid container spacing={3}>
                                    {
                                        data.map((item:any)=>(
                                            <Grid item xs={2}>
                                            <Avatar alt="Remy Sharp" src={item} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <input className={classes.input} type="file" id="icon-button-file" onChange={onFileChange} multiple />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <BackupTwoToneIcon />
                                    </IconButton>
                                </label>
                                <Tooltip title="Add" aria-label="add" onClick={() => {add_arr();}}>

                                    <Fab color="primary" className={classes.fab}
                                        onClick={() => {
                                            add_arr();
                                        }}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </div>
                        </Fade>
                    </Modal>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <SendRoundedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );

}

