import React, { useEffect } from 'react';
import { useStatePersist } from 'use-state-persist';
import '../App.css'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/styles";
import ProfileIcon from '../images/address 1.png';
import HeadIcon from '../images/head.png';
import {ExitToApp} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import { useWallet } from 'use-wallet'

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0px 1px 0px #E7E8F2'
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    headerTitle: {
        display: 'flex',
        alignItems: "center"
    },

    icon: {
        marginLeft: "5px",
        height: "50px",
        width: "50px",
        cursor: "pointer"
    },
    logoIcon: {
        marginLeft: "5px",
        height: "54px",
        width: "55px",
        cursor: "pointer"
    },
    headlineIcon: {
        marginLeft: "5px",
        fontFamily: 'HelveticaNeue',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '28px',
        textAlign: 'center',
        height: '28px',
        color: '#fbcf59',
        cursor: "pointer"
    },
    userName: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '15px',
        lineHeight: '19px',
        color: '#25233A',
        marginLeft: "4px"
    },
    welcome: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '21px',
        color: '#33343D'
    },
    disconnect: {
        background: '#EAF5FF',
        borderRadius: '5px',
        color: "#33343D",
        textTransform: "none",
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '21px',
        textAlign: 'center',
        boxShadow: "none",
        "&:hover": {
            background: '#EAF5FF',
            borderRadius: '5px',
            color: "#33343D",

        }
    }

}));


function Header() {
    const classes = useStyles();
    
    /* Will try to connect on load unless true. Default is true. */
    const [userDisconnected, setUserDisconnected] = useStatePersist(true);
    const { account, connect, reset } = useWallet()

    const connectOrDisconnect = () => {
        if (account) {
            setUserDisconnected(true);
            reset();
        } else {
            setUserDisconnected(false);
            connect('injected')
        }
    }

    useEffect(() => {
        if (!account && !userDisconnected) {
            connect();
        }
    }, [account, userDisconnected])

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Container maxWidth="xl" component="main">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarTitle}>
                        <div className={classes.headerTitle}>
                            <Typography variant={"body1"} className={classes.welcome}>Welcome</Typography>
                            {
                                account && <>
                                    <img src={ProfileIcon} alt={"Coinbase Wallet"} className={classes.icon}/>
                                    <Typography variant={"body1"} className={classes.userName}> {account}</Typography>
                                </>
                            }
                        </div>
                    </div>
                    <div className={classes.toolbarTitle}>
                        <div className={classes.headerTitle}>
                            <img src={HeadIcon} alt={"Coinbase Wallet"} className={classes.logoIcon}/>
                            <Typography className={classes.headlineIcon}>The GUHser</Typography>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.disconnect}
                        endIcon={<ExitToApp/>}
                        onClick={() => connectOrDisconnect()}
                    >
                        {account === null ? "Connect" : "Disconnect"}
                    </Button>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
