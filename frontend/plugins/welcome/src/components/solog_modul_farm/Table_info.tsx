import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Fade,
  Modal,
  Grid,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import ContactsIcon from '@material-ui/icons/Contacts';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {
  SiElectron,
} from "react-icons/si";
import { 
  RiSyringeLine,
  RiStethoscopeLine,
 } from "react-icons/ri";

import { Content } from '@backstage/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
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
  }),
);
export default function MoreInfo(id: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [no, setno] = useState<any>({});


  useEffect(() => {

    setno(id.id)

  }, []);

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleOpen}>
        รายละเอียดเพิ่มเติม
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container alignItems="center">
              <Content>

                <List className={classes.root}>
                  <div className={classes.section1}>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography gutterBottom variant="h4">
                          ประวัติผู้ป่วย
            </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h6">
                          {no.edges?.edgesOfPatientrightsPatientrecord?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography color="textSecondary" variant="body2">

                    </Typography>
                  </div>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="ที่อยู่ : " secondary={no.edges?.edgesOfPatientrightsPatientrecord?.home} />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ContactsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="รหัสประจำตัวประชาชน" secondary={no.edges?.edgesOfPatientrightsPatientrecord?.idcardnumber} />
                  </ListItem>


                  <Divider variant="inset" component="li" />


                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="เบอร์โทร" secondary={no.edges?.edgesOfPatientrightsPatientrecord?.phonenumber} />
                  </ListItem>



                </List>


              </Content>
        &emsp;
        <Content>


                <List className={classes.root}>
                  <div className={classes.section1}>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography gutterBottom variant="h4">
                          สิทธิ์ผู้ป่วย
            </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h6">
                          {no.permission}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography color="textSecondary" variant="body2">

                    </Typography>
                  </div>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary=" บริษัทประกันภัย : " secondary={no.edges?.edgesOfPatientrightsInsurance?.insurancecompany} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="เลขประกัน : " secondary={no.permission} />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <RiSyringeLine />
                      </Avatar>
                    </ListItemAvatar>


                    <ListItemText primary="ความสามารถสิทธิ์ : " secondary={"ค่าเวชภัณฑ์ : " + no.edges?.edgesOfPatientrightsAbilitypatientrights?.medicalSupplies} /> 
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                  
                      <Avatar>
                        <RiStethoscopeLine  />
                      </Avatar>
                    
                    </ListItemAvatar>
                    <ListItemText secondary={"ค่าหัตถการ : " + no.edges?.edgesOfPatientrightsAbilitypatientrights?.operative} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                  
                  <Avatar>
                    <SingleBedIcon />
                  </Avatar>
                
                </ListItemAvatar>
                    <ListItemText secondary={"ค่านอนโรงพยาบาล :" + no.edges?.edgesOfPatientrightsAbilitypatientrights?.stayInHospital} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                  
                  <Avatar>
                    <SiElectron />
                  </Avatar>
                
                </ListItemAvatar>
                    <ListItemText secondary={"ตรวจสุขภาพ และ ค่า แลป :" + no.edges?.edgesOfPatientrightsAbilitypatientrights?.examine} />
                    </ListItem>

                      <Divider variant="inset" component="li" />
                      <ListItem>

                      </ListItem>





                </List>

              </Content>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}