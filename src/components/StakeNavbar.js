
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, Grid} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import head from '../images/head.png';

const useStyles = makeStyles((theme) => ({
    appBarSolid: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: 'black'
    }, 
    button: {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      color: theme.palette.common.white,
      marginLeft: 20,
      backgroundColor: '#53CA42',
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    icon: {
      fontSize:22,
      color: '#fbcf59',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    let history = useHistory();

    return (
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBarSolid}>
            <Toolbar>
              <Grid container direction="row" alignItems="center">
                <Grid item xs>
                  <div>Welcome</div>
                </Grid>
                <Grid item xs className={classes.icon}>
                  <img src={head} alt="toon" style={{ width: '12%'}}/>
                  <div>&nbsp;&nbsp;The GUSser</div>
                </Grid>
                <Grid item xs>
                  <Button variant="contained" className={classes.button}>Connect</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div >
    );
}
