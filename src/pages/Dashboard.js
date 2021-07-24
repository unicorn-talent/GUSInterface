import React, {useState, useEffect, useRef} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Button, TextField} from '@material-ui/core';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import ReactApexChart from 'react-apexcharts';
import Tooltip from '@material-ui/core/Tooltip';
import { MetaMaskProvider, useMetaMask } from "metamask-react";

import toon from '../assets/images/toon.png';
import img1 from '../assets/images/blob1.png';
import img2 from '../assets/images/blob2.png';
import img3 from '../assets/images/blob3.png';
import img4 from '../assets/images/blob4.png';
import img5 from '../assets/images/blob5.png';
import img6 from '../assets/images/blob6.png';
import img7 from '../assets/images/blob7.png';
import '../css/dashboard.css'
import { green } from '@material-ui/core/colors';

import {getInfo, writeRebase} from '../Gus/gus';
import { ethers } from 'ethers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card_icon: {
    position: 'absolute',
    top: 0,
    right: 5
  },
  card_font: {
    fontSize:'20px',
    position: 'relative'
  },
  content: {
    position: 'relative'
  },
  section: {
    width: '50%',
    margin: '20px'
  },
  addr: {
    color:'#1d4ed8',
    fontFamily:'Inter,sans-serif',
    textDecoration:'none'
  },
  button: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    color: theme.palette.common.white,
    backgroundColor: '#53CA42',
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  text: {
    position: 'relative',
    fontSize:' 30px',
    fontWeight: '700',
    fontFamily: 'Inter,sans-serif'
  }
}));

const useStylesToolip = makeStyles((theme) => ({
  arrow: {
    color: '#53ca42',
  },
  tooltip: {
    backgroundColor: '#53ca42',
    fontSize: '14px',
    color: '#131415',
    padding: '10px'
  },
}));

let initial_flag = 0;


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



const Dashboard = () => {
  const classes = useStyles();
  const tooltipClasses = useStylesToolip();
  
  const series = [{
    name: 'series1',
    data: [57000, 88100, 59400, 62400,35046, 76500, 70200, 73400, 54050]
  }];
  const options = {
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#55a630', '#00E396', '#CED4DC'],
    fill: {
      type: 'gradient'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:00:00.000Z",  "2018-09-19T03:20:00.000Z", 
        "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        show: false,
        format: 'dd/MM/yy HH:mm'
      },
    }
  };

  const { status, connect, account  } = useMetaMask ();
  const [rebase, setRebase] = useState("");
  const [rebaseTime, setRebaseTime] = useState(0);
  const [currentPeg, setCurrentPeg] = useState(0);
  const [oraclePrice, setOraclePrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [supplyDelta, setSupplyDelta] = useState(0);
  const [myaddress, setMyaddress] = useState("");
  const [holdings, setHoldings] = useState("");
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    fetch('https://api.bscscan.com/api?module=account&action=txlist&address=0x4ca2679f6518693213b646c29ef149e0707123b9&apikey=T8X5MHYDFRQJTSIUG58UBY3Y6Y8AI8R6QG&startBlock=9409241')
      .then(response => response.json())
      .then(data => {
        setTransactions(data.result);
      });

    console.log(status);
    if (status == "notConnected") setHoldings(<Button variant="contained" className={classes.button} onClick={connect}>Connet Wallet</Button>)
    else  if (status == 'connected') setMyaddress(account);

  },[status, holdings, myaddress]);
  

  const rebaseTimeCallback = (timestamp) => {    
    setRebaseTime(timestamp);
  }

  const rebaseValueCallback = (rebase_val) => {
    // console.log("rebase0:" + rebase_val[0].toString());
    
    // console.log("rebase1:" + rebase_val[1].toString());
    setSupplyDelta(Math.round(ethers.utils.formatEther(rebase_val[1].toString())));
  }

  const targetRateCallback = (target_rate) => {
    setCurrentPeg(Math.round(ethers.utils.formatEther(target_rate.toString())/21*20));
  }

  const dataCallback = (data) => {
    setOraclePrice(Math.round(ethers.utils.formatEther(data.toString())));
  }

  const totalSupplyCallback = (total_supply) => {
    setTotalSupply(parseInt(total_supply) / Math.pow(10,9));
  }

  const balanceOfCallback = (balance) => {
    setHoldings(balance.toString()); 
  }

  const rebaseTimeCalc = () => 
  {
    const currentTime = (new Date()).getTime() / 1000;
    setRebase();
    if (rebaseTime != 0 && rebaseTime - currentTime > 0) {
      const hour = Math.floor((rebaseTime - currentTime) / 3600);
      const minute = Math.floor(((rebaseTime - currentTime) % 3600) / 60);
      const second = Math.floor((rebaseTime - currentTime) % 60);
      const ret = hour + "h:" + minute + "m:" + second + "s";
      setRebase(ret)
    }else if (rebaseTime - currentTime < 0) {
      setRebase(<Button variant="contained" className={classes.button} onClick={writeRebase}>Rebase</Button>)
    }
  }

  useInterval(() => {
    rebaseTimeCalc(); 
    getInfo(rebaseTimeCallback, rebaseValueCallback, targetRateCallback, dataCallback, totalSupplyCallback, balanceOfCallback, myaddress);
  }, 1000);

  return (


    <div className="dashboard">
      <h1 style={{color: 'white'}}>GUS Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img src={toon} alt="toon" style={{ width: '50%', height:'50%'}}/>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-3rem', right: 0}}>
                    <img src={img1} alt="blob1"/>
                  </div>
                  <div className={classes.card_icon}>
                    <Tooltip title="Countdown until the next rebase. Occurs every 4 hours. A button will apper to initiate a rebase at the end of the countdown" 
                      arrow classes={tooltipClasses}>
                      <HelpOutlinedIcon fontSize="small" />
                    </Tooltip>
                  </div>
                  <div className={classes.card_font} style={{ color: '#3B82F6'}}>
                    Rebase Status
                  </div>
                  <div className={classes.text}>
                    {rebase}
                  </div>              
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', left: 0}}>
                    <img src={img2} alt="blob2" />
                  </div>
                  <div className={classes.card_icon}>
                    <Tooltip title="The current price the token is programatically pegged to. This will increase on every rebase by 5%." 
                      arrow classes={tooltipClasses}>
                      <HelpOutlinedIcon fontSize="small" />
                    </Tooltip>
                  </div>
                  <div className={classes.card_font} style={{ color: '#EC4899'}}>
                    Current Peg
                  </div>
                  <div className={classes.text}>
                    <span>${currentPeg}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', left: 0}}>
                    <img src={img3} alt="blob3"/>
                  </div>
                  <div className={classes.card_icon}>
                    <HelpOutlinedIcon fontSize="small" />
                  </div>
                  <div className={classes.card_font} style={{ color: '#8B5CF6'}}>
                    Oracle Price
                  </div>
                  <div className={classes.text}>
                    <span>${oraclePrice}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', right: 0}}>
                    <img src={img4} alt="blob4"/>
                  </div>
                  <div className={classes.card_icon}>
                    <HelpOutlinedIcon fontSize="small" />
                  </div>
                  <div className={classes.card_font} style={{ color: '#53ca42'}}>
                    Market Cap
                  </div>
                  <div className={classes.text}>
                    <span>${Math.round(oraclePrice*totalSupply)}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', left: 0}}>
                    <img src={img5} alt="blob5"/>
                  </div>
                  <div className={classes.card_icon}>
                    <HelpOutlinedIcon fontSize="small" />
                  </div>
                  <div className={classes.card_font} style={{ color: '#EF4444'}}>
                    Total Supply
                  </div>
                  <div className={classes.text}>
                    <span>{Math.round(totalSupply)}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', right: 0}}>
                    <img src={img6} alt="blob6" />
                  </div>
                  <div className={classes.card_icon}>
                    <HelpOutlinedIcon fontSize="small" />
                  </div>
                  <div className={classes.card_font} style={{ color: '#53ca42'}}>
                    My Holdings
                  </div>
                  <div className={classes.text}>
                    {holdings}
                  </div>              
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent className={classes.content}>
                  <div style={{ position: 'absolute', top: '-2rem', right: 0}}>
                    <img src={img7} alt="blob7"/>
                  </div>
                  <div className={classes.card_icon}>
                    <HelpOutlinedIcon fontSize="small" />
                  </div>
                  <div className={classes.card_font} style={{ color: '#F59E0B'}}>
                    Expected Supply Delta
                  </div>
                  <div className={classes.text}>
                    <span>{supplyDelta}</span>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>        
        <Grid item xs={3}>
          <img src={toon} alt="toon" style={{ width: '50%', height:'50%'}}/>
        </Grid>
      </Grid>
      <section className={classes.section}>
        <h2 style={{textAlign:'left'}}>Price Chart</h2>
        <div>
          <ReactApexChart options={options} series={series} type="area" height={320} />
        </div>
      </section>
      <section className={classes.section}>
        <h2 style={{textAlign:'left', margin:' 10px'}}>Rebase Transactions</h2>
        <p style={{textAlign:'left', color:'rgba(55,65,81,1)', fontSize: '15px'}}>A list of the last few successful rebase transactions initiated for GUS.</p>
        <div style={{textAlign: 'left', fontSize:'16px'}}>
          {transactions.map((trans, index) => (
            <div key={index} style={{marginTop: '35px'}}>
              <div>
                <span><b>{index+1}</b></span>&nbsp;&nbsp;&nbsp;
                <a className={classes.addr} href={"https://bscscan.com/tx/" + trans.hash} target="_blank">{trans.hash}</a>
              </div>
              <div style={{paddingLeft: '30px', color:'rgba(55,65,81,1)'}}>
                <span>{trans.timeStamp}</span>
              </div>
            </div>
          ) )}
        </div>        
      </section>
    </div>
  );
}

export default Dashboard;