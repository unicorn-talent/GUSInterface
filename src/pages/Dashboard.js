import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import ReactApexChart from 'react-apexcharts';
import Tooltip from '@material-ui/core/Tooltip';

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

export default function Dashboard() {
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

  var transactions=[
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    },
    {
      addr: '0xd8de267a237a1445e881575156bf6e92ea1b935f2c0021220891ff93d015dc1e',
      datetime: '7/18, 8:35 AM'
    }
  ];

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
                  <div>
                    <Button variant="contained" className={classes.button}>Rebase</Button>
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
                    <span>$34386</span>
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
                    <span>$61782</span>
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
                    <span>$641,530</span>
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
                    <span>10</span>
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
                  <div>
                    <Button variant="contained" className={classes.button}>Connet Wallet</Button>
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
                    <span>0</span>
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
                <a className={classes.addr} href={"https://bscscan.com/tx/" + trans.addr} target="_blank">{trans.addr}</a>
              </div>
              <div style={{paddingLeft: '30px', color:'rgba(55,65,81,1)'}}>
                <span>{trans.datetime}</span>
              </div>
            </div>
          ) )}
        </div>        
      </section>
    </div>
  );
}