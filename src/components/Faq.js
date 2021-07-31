import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    // maxWidth: 400,
    textAlign: 'left',
    flexGrow: 1,
  },
  label: {
    "& > .MuiTreeItem-content .MuiTreeItem-label": {
      fontSize: 18,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    "&.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label" :{
      backgroundColor: 'transparent',
    },
    "&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
      fontSize: 18,
      backgroundColor: 'transparent',
    },
    marginBottom: 20
  },
  item: {
    fontSize: 15,
    color: 'gray',
    marginTop:20,
    marginBottom: 20,
    
  }
});

export default function Faq() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      <TreeItem nodeId="1" label="What is GUS (Goes Up Shohei)?" className={classes.label}>
        <div className={classes.item}>
          An elastic supply (or rebase) token will expand or contract its circulating supply depending on where it trades relative to it's peg price. For 360 epochs, GUS will increase 5% every 4 hours, starting from an initial peg price of $.001
        </div>
      </TreeItem>
      <TreeItem nodeId="2" label="What is an elastic supply token?" className={classes.label}>
        <div className={classes.item}>
        Elastic supply tokens have a changing circulating supply. The idea is that instead of price volatility, what changes is the token supply through events called rebases.
        </div>
      </TreeItem>
      <TreeItem nodeId="3" label="What is a rebase?" className={classes.label}>
        <div className={classes.item}>
        The rebasing mechanism adjusts the token circulating supply periodically. Let’s say we have an elastic supply token that aims to achieve a value of 1 USD. If the price is above 1 USD, the rebase increases the current supply, reducing the value of each token. This is known as a positive rebase. Conversely, if the price is below 1 USD, the rebase will decrease the supply, making each token worth more. This is known as a negative rebase.
        </div>
      </TreeItem>
      <TreeItem nodeId="4" label="Was there a prescale?" className={classes.label}>
        <div className={classes.item}>
        There was no presale, fair/stealth launched.
        </div>
      </TreeItem>
      <TreeItem nodeId="5" label="Is liquidity locked?" className={classes.label}>
        <div className={classes.item}>
        All $150,000 of initial liquidity has been burned and is permanently locked in the burn address.
        </div>
      </TreeItem>
      <TreeItem nodeId="6" label="What's going on with the chart?" className={classes.label}>
        <div className={classes.item}>
          Due to the nature of the protocol, the price of the coin rebases every 4 hours to the pegged price. If you observe early on, the coin experienced many positive rebases due to the coin's price being well above the pegged-price. In this situation, the token's value dropped to match the pegged price, however, the token supply increased. If you are holding GUS tokens in your wallet, you will notice them fluctuating after a rebase. The protocol is designed for token supply to change without the holders having to do anything.
        </div>
      </TreeItem>
      <TreeItem nodeId="7" label="Will I lose coins?" className={classes.label}>
        <div className={classes.item}>
          In the event that we experience a negative rebase, the value of the coin will increase to match the pegged-price. In this event, the protocol will reduce the amount of circulating tokens to match. It is important to note, this will not influence the value of your holdings. Like most tokens, that value will be determined by the buying and selling pressure.
        </div>
      </TreeItem>
    </TreeView>
  );
}
