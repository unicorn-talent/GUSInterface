import React, {useState, useEffect} from 'react';
import '../App.css'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles, withStyles} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {alpha, InputBase} from "@material-ui/core";
import { useWallet } from 'use-wallet'
import tokens from "../Info/token.json"
import Geyser, {getTotalStats} from '../Gus/geyser';
import UniswapPool from '../Gus/swappool';

const tokenInfo = tokens.mainnet;

const useStyles = makeStyles((theme) => ({
    box: {
        border: '1px solid #eee',
        borderRadius: '8px',
        width: 'auto',
        padding: '10px 15px',
        marginTop: '0px',
        background: '#f8f8f8',
        color: ' #000',
        boxSizing: 'border-box !important'
    },

    bodyText: {
        fontSize: '1rem',
        textAlign: 'left',
        fontWeight: '300',
        lineHeight: '25px'
    },
    price: {
        fontSize: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        lineHeight: '25px',
        color: "#000"
    },
    helpIconGrid: {
        textAlign: "right"
    },
    helpIcon: {
        color: "#2c2c2c",
        fontSize: "1.25em"
    },
    card: {
        padding: '12px',
        marginTop: "50px",
        boxShadow: '0px -2px 25px -3px rgba(0, 0, 0, 0.1) !important'
    },


    tabs: {
        marginTop: "12px"
    },
    tabsStyle: {
        backgroundColor: "#000",
        color: '#777',
        borderRadius: "8px",
        '& .MuiTab-textColorPrimary': {
            color: '#777',
            fontWeight: "bold"
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: '#000000',
            border: '1.5px solid #2c2c2c',
            background: '#fff',
            boxSizing: 'border-box',
            borderRadius: '10px',
            fontWeight: "bold"
        }
    },

    tabRoot: {
        width: "100%",
    },
    listItems: {},
    listPrimaryText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#33343D',
    },
    secondaryText: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#33343D',
    },
    listHead: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '15px',
        lineHeight: '19px',
        color: '#25233A',
        opacity: '0.26'
    },
    header: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#01058A'
    },
    cardHeaderRoot: {
        paddingTop: 4,
        paddingBottom: 4
    },
    walletBalanceCard: {
        background: '#53ca42',
        borderRadius: '6px',
        marginTop: "50px",
        padding: "8px"
    },
    depositBalanceCard: {
        background: '#fbcf59',
        borderRadius: '6px',
        marginTop: "40px",
        padding: "8px"

    },
    walletHeader: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '114.95%',
        color: '#111827',
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    walletHeaderThin: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '16px',
        lineHeight: '114.95%',
        color: '#111827',
        marginTop: "2px",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    depositAmount: {
        backgroundColor: "#fbcf59",
        height: '130px',
        width: '130px',
        borderRadius: '100%',
        textAlign: "center",
        margin: 'auto'
    },

    gearbox: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '23px',
        textAlign: 'center',
        color: '#111827',
        lineHeight: '130px'
    },

    withdrawButton: {
        background: '#53ca42',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#111827',
        boxShadow: "none",
        height: '40px',
        marginTop: '60px',
        marginBottom: '20px',
        [theme.breakpoints.down('md')]: {
            marginBottom: '30px',
            marginTop: '30px',
            width: "100%"
        },
        "&:hover": {
            background: '#53ca42',
            color: '#111827',
        }

    },
    withdrawButtonMax: {
        background: '#53ca42',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#111827',
        boxShadow: "none",
        marginLeft: "8px",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#53ca42',
            color: '#111827',
        },
        "&:disabled": {
            background: '#53ca42',
            color: '#7F7F7F',
        }
    },
    depositButton: {
        background: '#fbcf59',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#111827',
        boxShadow: "none",
        float: "right",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#fbcf59',
            color: '#111827',
        },
        [theme.breakpoints.down('md')]: {
            width: "100%"
        },
    },
    depositButtonMax: {
        background: '#fbcf59',
        mixBlendMode: 'normal',
        borderRadius: '4px',
        color: '#111827',
        boxShadow: "none",
        marginLeft: "8px",
        height: '40px',
        marginTop: '-5px',
        "&:hover": {
            background: '#53ca42',
            color: '#111827',
        },
        "&:disabled": {
          background: '#fbcf59',
          color: '#7F7F7F',
        }
    },
    listItemRoot: {
        paddingTop: "16px",
        paddingBottom: "16px",
    },
    divider: {
        background: "#E7E8F2"
    },
    loading: {
        width: '40px',
        height: '40px',
        position: 'fixed',
        left: '50%',
        top: '50%',
    }
}));


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
        marginTop: "20px",
        marginBottom: "20px",
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 18,
        width: '100%',
        padding: '8px 8px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const TxType = {
    None: 0,
    Approve: 1, 
    Deposit: 2,
    Withdraw: 3,
}

function ContentComponent() {

    const statsLabels = [{
        id: "all_time_total_rewards_token",
        name: "Total Rewards",
        unit: "GUS"
    }, {
        id: "current_locked_rewards_token",
        name: "Locked Rewards",
        unit: "GUS"
    }, {
        id: "program_duration_days",
        name: "Maximum bonus at",
        unit: "days"
    }, {
        id: "current_total_staked",
        name: "Total Deposits",
        unit: "USD"
    }, {
        id: "current_unlocked_rewards_token",
        name: "Unlocked Rewards",
        unit: "GUS"
    }, {
        id: "current_reward_rate_30d_token",
        name: "Reward unlock rate",
        unit: `GUS / month`
    },
    {
        id: "apy_estimate",
        name: "APY",
        unit: "%"
    }];

    const classes = useStyles();
    const { account, ethereum, connect } = useWallet()

    const [availableBalance, setAvailableBalance] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [pending, setPending] = useState(false);
    const [, setPendingTxType] = useState(TxType.None);
    const [checkTxTimer, setCheckTxTimer] = useState(null);
    const [pendingTx, setPendingTx] = useState(null);

    const [rewardsToBeClaimed, setRewardsToBeClaimed] = useState(null);
    const [depositedLiquidityEquivalent, setDepositedLiquidityEquivalent] = useState(null);
    const [accumulatedRewards, setAccumulatedRewards] = useState(null);

    const [depositedBalance, setDepositedBalance] = useState(0);
    const [geyser, setGeyser] = useState(null);
    const [uniswapPool, setUniswapPool] = useState(null);

    const [totalStaked, setTotalStaked] = useState(0);
    const [rewardRate30, setRewardRate30] = useState(0);

    const [deposit, setDeposit] = useState(0)
    const [withdraw, setWithdraw] = useState(0)

    const [, setDepositString] = useState("")
    const [withdrawString, setWithdrawString] = useState("")

    const handleChangeDepositAmount = (event) => {  
        let stringValue = event.target.value;
        let numberValue = Number(event.target.value);
        if (numberValue < 0) {
            stringValue = "0";
            numberValue = 0;
        }
        setDepositString(stringValue);
        setDeposit(numberValue);
    }
    const handleChangeWithdrawAmount = async (event) => {
        let stringValue = event.target.value;
        let numberValue = Number(event.target.value);
        if (numberValue < 0) {
            stringValue = "0";
            numberValue = 0;
        }
        setWithdrawString(stringValue);
        setWithdraw(numberValue);
        setRewardsToBeClaimed(await geyser.rewardsToBeClaimed(numberValue));
    }

    const depositPercent = () => {
        if (deposit === null || availableBalance === 0) {
            return 0;
        }
        if (deposit > availableBalance) {
            return 100;
        }
        return deposit * 100 / availableBalance;
    }

    const estimateMonthlyReward = () => {
        if (deposit === null || deposit <= 0) {
            return 0;
        }
        return deposit * rewardRate30 / (totalStaked + deposit);
    }

    const requireApprove = () => {
        if (account) {
            return deposit > allowance || allowance === 0;
        }
        return false;
    }

    const approveToken = () => {
        if (geyser && !pending) {
            setPending(true);
            geyser.approve(availableBalance).then(({hash, status}) => {
                setPending(false);
                updateInfo(geyser, uniswapPool);
                // setPendingTx(hash);
                setPendingTxType(TxType.Approve);
            });
        }
    }

    const stake = () => {
        if (geyser && !pending) {
            if (deposit <= allowance) {
                setPending(true);
                geyser.stake(deposit).then(({hash, status}) => {
                    setPending(false);
                    updateInfo(geyser, uniswapPool);
                    // setPendingTx(hash);
                    setPendingTxType(TxType.Deposit);
                });
            }
        }
    }

    const unstake = () => {
        if (geyser && !pending) {
            if (withdraw <= depositedBalance) {
                setPending(true);
                geyser.unstake(withdraw).then(({hash, status}) => {
                    setPending(false);
                    updateInfo(geyser, uniswapPool);
                    // setPendingTx(hash);
                    setPendingTxType(TxType.Withdraw);
                });
            }
        }
    }
    
    const setMaxWithdraw = async () => {
        setWithdraw(depositedBalance);
        setWithdrawString(depositedBalance.toString());
        setRewardsToBeClaimed(await geyser.rewardsToBeClaimed(depositedBalance));
    }

    const setMaxDeposit = () => {
        setDeposit(availableBalance);
        setDepositString(availableBalance.toString());
    }

    const checkTxStatus = async () => {
        if (pendingTx && geyser) {
            const confirmed = await geyser.checkTxStatus(pendingTx);
            if (confirmed) {
                setPendingTx(null);
                setPendingTxType(TxType.None);
                setPending(false);
                if (checkTxTimer) {
                    clearInterval(checkTxTimer);
                }
                setCheckTxTimer(null);
            }
        }
    }
    const [items, setItems] = React.useState([
        {
            name: "Total Rewards",
            value: "-- GUS",
        }, {
            name: "Locked Rewards",
            value: "-- GUS",
        }, {
            name: "Program duration",
            value: "-- days left",
        }, {
            name: "Total Deposits",
            value: "-- USD",
        }, {
            name: "Unlocked Rewards",
            value: "-- GUS",
        }, {
            name: "Reward unlock rate",
            value: "-- GUS / month",
        }
    ]);

    const formatNumber = (number, decimalPlaces) => {
      const locale = window.navigator.userLanguage || window.navigator.language;
      return number.toLocaleString(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
      });
    }

    const updateTotalStats = async () => {
        const stats = await getTotalStats();
        const newItems = statsLabels.map(statsLabel => {
            const valueString = formatNumber(stats[statsLabel.id], 2);
            return {
                name: statsLabel.name,
                value: `${valueString} ${statsLabel.unit}`
            }
        });
        setTotalStaked(stats.current_total_staked_token);
        setRewardRate30(stats.current_reward_rate_30d_token);

        setItems(newItems);
    }

    const updateInfo = (_geyser, _uniswapPool) => {
        _geyser.availableHumanBalance().then(_balance => {
            setAvailableBalance(_balance);
        });
        _geyser.allowance().then(_allowance => {
            setAllowance(_allowance);
        });
        _geyser.depositedAmount().then(async (_depositedAmount) =>  {
            setDepositedBalance(_depositedAmount);
            const equivalence = await _uniswapPool.computeUNIV2Equivalence(_depositedAmount);
            setDepositedLiquidityEquivalent(equivalence);

            if (_depositedAmount > 0) {
              return _geyser.rewardsToBeClaimed(_depositedAmount);
            }
            else {
              return _geyser.rewardsToBeClaimed(0);
            }


        }).then((accumulatedRewards) => {
            setAccumulatedRewards(accumulatedRewards); 
        });

        updateTotalStats();
    }
    
    useEffect(() => {
        if (pendingTx !== null) {
            const interval = setInterval(() => {
                checkTxStatus();
            }, 5000);
            setCheckTxTimer(interval);
        }
    }, [pendingTx])

    useEffect(() => {
        if (account) {
            const geyser = new Geyser(account, ethereum);
            const uniswapPool = new UniswapPool(account, ethereum);
            setGeyser(geyser);
            setUniswapPool(uniswapPool);
            updateInfo(geyser, uniswapPool);

        } else {
            setGeyser(null);
            setPending(false);
            setAllowance(0);
            setAvailableBalance(0);
            setDepositedBalance(0);
        }
    }, [account]);

    useEffect(() => {
        updateTotalStats();
    }, [])

    
    const enterAmountPlaceholder = "Enter Amount";
    const typeString = "Type";
    const amountString = "Amount";
    const statsTitleString = "Stats";

    return (
        <Container maxWidth="lg" component="main">
            {pending && <CircularProgress className={classes.loading}/>}
            {!pending &&
            <Grid container spacing={5}>
                <Grid item md={8}>
                    <Card className={classes.walletBalanceCard}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justifyContent={"center"}  style={{textAlign: 'left'}}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Wallet balance:</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{availableBalance/1000000000000000000}&nbsp;
                                        ({tokenInfo.staking.name})</Typography>
                                    <BootstrapInput type="number" id="bootstrap-input" inputProps={{ min: "0", max: availableBalance, step: "0.0001" }}  placeholder={enterAmountPlaceholder} disabled={!account}
                                    value={deposit}
                                      onChange={handleChangeDepositAmount}/>
                                    <Button
                                        variant={"contained"}
                                        className={classes.depositButtonMax}
                                        onClick={() => setMaxDeposit()}
                                        disabled={!account}
                                    >Max</Button>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Your Estimated Rewards:</Typography>
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{formatNumber(estimateMonthlyReward(), 2)} {tokenInfo.reward.name} / month</Typography>
                                </Grid>

                                <Grid item md={3} sm={12} xs={12}>
                                    <div className={classes.depositAmount}>
                                        <Typography variant={"h4"} className={classes.gearbox}>{formatNumber(depositPercent(), 2)} %</Typography>
                                    </div>

                                </Grid>
                                <Grid item md={3} sm={12} xs={12}>
                                {
                                    !account && <Button
                                        variant={"contained"}
                                        className={classes.depositButton}
                                        onClick={() => connect('injected')}
                                    >Connect</Button>
                                }
                                {
                                    account && requireApprove() && <Button
                                        variant={"contained"}
                                        className={classes.depositButton}
                                        onClick={() => approveToken()}
                                    >Approve</Button>
                                }
                                {
                                    account && !requireApprove() && 
                                    <Button
                                        variant={"contained"} 
                                        className={classes.depositButton}
                                        onClick={() => stake()}
                                    >Deposit</Button>
                                }
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className={classes.depositBalanceCard}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center" justifyContent={"center"} style={{textAlign: 'left'}}>
                                <Grid item md={8} sm={12} xs={12}>
                                    <Typography variant={"h5"} className={classes.walletHeader}>Deposited balance:</Typography>

                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>{formatNumber(depositedBalance, 18)}&nbsp;
                                        ({tokenInfo.staking.name})
                                    </Typography>
                                    { depositedLiquidityEquivalent &&
                                    <Typography variant={"h6"} className={classes.walletHeaderThin}>({formatNumber(depositedLiquidityEquivalent[0], 4)} BNB / {formatNumber(depositedLiquidityEquivalent[1], 2)} GUS)</Typography>
                                    }

                                    <BootstrapInput type={"number"} id="bootstrap-input" inputProps={{ min: "0", max: depositedBalance, step: "0.0001" }} placeholder={enterAmountPlaceholder} disabled={!account}
                                                    value={withdrawString}
                                                    onChange={handleChangeWithdrawAmount}/>
                                    <Button
                                        variant={"contained"}
                                        className={classes.withdrawButtonMax}
                                        disabled={!account}
                                        onClick={() => setMaxWithdraw()}
                                    >Max</Button>

                                    {
                                      accumulatedRewards !== null && depositedBalance > 0 &&
                                      <React.Fragment>
                                          <Typography variant={"h5"} className={classes.walletHeader}>Accumulated Rewards:</Typography>
                                          <Typography variant={"h6"} className={classes.walletHeaderThin}>{formatNumber(accumulatedRewards, 2)} {tokenInfo.reward.name}</Typography>
                                      </React.Fragment>
                                    }  
                                </Grid>
                                <Grid container item md={4} sm={12} xs={12} justifyContent="flex-end">
                                    {
                                        account && <Button
                                            variant={"contained"}
                                            className={classes.withdrawButton}
                                            onClick={() => unstake()}
                                        >Withdraw</Button>
                                    }
                                    {
                                        !account && <Button
                                            variant={"contained"}
                                            className={classes.withdrawButton}
                                            onClick={() => connect('injected')}
                                        >Connect</Button>
                                    }
                                    {
                                        account && rewardsToBeClaimed !== null && <>
                                        <br/>
                                            <Typography variant={"h5"} className={classes.walletHeader}>Estimated Rewards To Be Claimed</Typography>
                                            <Typography variant={"h6"} className={classes.walletHeaderThin}>{formatNumber(rewardsToBeClaimed, 2)}&nbsp;
                                            {tokenInfo.reward.name}</Typography>
                                        </>
                                    }
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <Card className={classes.card}>
                        <CardHeader title={statsTitleString} classes={{root: classes.cardHeaderRoot, title: classes.header}}>
                        </CardHeader>
                        <Divider classes={{root: classes.divider}}/>
                        <List className={classes.listItems}>
                            <ListItem classes={{root: classes.listItemRoot}}>
                                <ListItemText primary={typeString} classes={{primary: classes.listHead}}/>
                                <ListItemSecondaryAction>
                                    <ListItemText primary={amountString} classes={{primary: classes.listHead}}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {items.map((value, index) => {
                                return (<React.Fragment key={index}>
                                        <Divider classes={{root: classes.divider}}/>
                                        <ListItem key={value} classes={{root: classes.listItemRoot}}>
                                            <ListItemText primary={value.name}
                                                          classes={{primary: classes.listPrimaryText}}/>
                                            <ListItemSecondaryAction>
                                                <ListItemText primary={value.value}
                                                              classes={{primary: classes.secondaryText}}/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Card>
                </Grid>
            </Grid>
            }
        </Container>

    );
}

export default ContentComponent;
