import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreInfo from './Table_info'
import moment from 'moment';
import CardMedia from '@material-ui/core/CardMedia';




const useStyles = makeStyles(theme => ({
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
}));



export default function ComponentsTable(sim: any) {
  const classes = useStyles();










  var p = 0;
  
  if (sim.sim.length > 0) {
    p = p + 1
  }





  if (p !== 0) {
    return (

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell align="center">เพิ่มเติม</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {sim.sim === undefined
              ? null
              : sim.sim.map((item: any) => (
                <TableRow>
                  <TableCell align="center">
                  <CardMedia
                component="img"
                height="240"
                image={item.img}
                id="img"
              />
                  </TableCell>
                  <TableCell align="center">{item.res}</TableCell>
                  <TableCell align="center">
                    <MoreInfo id={item}></MoreInfo>
                  </TableCell>




                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
             
            </TableRow>

          </TableHead>

        </Table>
      </TableContainer>
    );
  }

}




