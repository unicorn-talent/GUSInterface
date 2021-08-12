
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, Grid, Hidden} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    appBarTransparent: {
        backgroundColor: 'rgba(251, 207, 89, 0.5)',
        boxShadow: 'none'
    },
    appBarSolid: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: 'none',
        padding: 8
    }, 
    linkGroup: {
      textAlign: 'right'
    },
    link: {
      fontSize:17,
      marginLeft: 30,
      textDecoration: 'blink',
      color: 'gray',
      '&:hover': {
        color: 'black',
      },
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
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    const [navBackground, setNavBackground] = useState('appBarTransparent')
    const navRef = React.useRef()
    navRef.current = navBackground

    let history = useHistory();

    const onDashboard = () => {
      history.push("/dashboard");
    }

    const onStake = () => {
      history.push("/stake");
    }
    
    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 50
            if (show) {
                setNavBackground('appBarSolid')
            } else {
                setNavBackground('appBarTransparent')
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div>
          <AppBar position="fixed" className={classes[navRef.current]}>
            <Toolbar>
              <Grid container direction="row" alignItems="center" justifyContent="center">
                <Hidden smDown>
                  <Grid item md={6} className={classes.linkGroup}>
                    <a className={classes.link} href="#audits">Audits</a>
                    <a className={classes.link} href="#roadmap">Roadmap</a>
                    <a className={classes.link} href="#faq">FAQ</a>
                  </Grid>
                </Hidden>
                <Grid item md={6}>
                  <Button variant="contained" className={classes.button} onClick={onDashboard}>Dashboard</Button>
                  <Button variant="contained" className={classes.button} onClick={onStake}>GUSser</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div >
    );
}
