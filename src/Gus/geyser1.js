const ethers = require('ethers');
// var provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const config = require("../info/guh.json");

const geyser_abi = [
  "function totalStaked() public view returns (uint256)",
  "function totalLocked() external view returns (uint256)",
  "function totalUnlocked() public view returns (uint256)",
];

const master_oracle_abi = [
  "function getData() external view returns (uint256)",
];

const guh_abi = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address who) external view returns (uint256)",
];

const geyser_iface = new ethers.utils.Interface(geyser_abi);
const master_oracle_iface = new ethers.utils.Interface(master_oracle_abi);
const guh_iface = new ethers.utils.Interface(guh_abi);

const totalStaked = geyser_iface.encodeFunctionData("totalStaked");
const totalLocked = geyser_iface.encodeFunctionData("totalLocked");
const totalUnlocked = geyser_iface.encodeFunctionData("totalUnlocked");
const getData = master_oracle_iface.encodeFunctionData("getData");
const totalSupply = guh_iface.encodeFunctionData("totalSupply");
const master_oracle = config.MarketOracle;
const geyser = config.TokenGeyser;
const guh = config.Token;

const getInfo = async (rebaseTimeCallback, rebaseValueCallback, targetRateCallback, dataCallback, totalSupplyCallback, balanceOfCallback, address) => {
  try {
    var res = await provider.call({
      to: geyser,
      data: totalStaked
    });
    const expiry_ts = geyser_iface.decodeFunctionResult("totalStaked", res);
    const ts = parseInt(expiry_ts);
    console.log(ts.toString());
    // rebaseTimeCallback(ts);
    
    res = await provider.call({
      to: geyser,
      data: totalLocked
    });
    const rebase_val = geyser_iface.decodeFunctionResult("totalLocked", res);
    console.log(rebase_val.toString());
    // rebaseValueCallback(rebase_val)
    
    res = await provider.call({
      to: geyser,
      data: totalUnlocked
    });
    const target_rate = geyser_iface.decodeFunctionResult("totalUnlocked", res);
    console.log(target_rate.toString());
    // targetRateCallback(target_rate);

    res = await provider.call({
      to: master_oracle,
      data: getData
    });
    const data = master_oracle_iface.decodeFunctionResult("getData", res);
    console.log(data.toString());
    // dataCallback(data);

    res = await provider.call({
      to: guh,
      data: totalSupply
    });
    const guh_totalSupply = guh_iface.decodeFunctionResult("totalSupply", res);
    console.log(guh_totalSupply.toString());
    // totalSupplyCallback(guh_totalSupply);

    res = await provider.call({
      to: guh,
      data: totalSupply
    });
    const pair_totalSupply = guh_iface.decodeFunctionResult("totalSupply", res);
    console.log(pair_totalSupply.toString());
    // totalSupplyCallback(pair_totalSupply);

  }catch(err) {
    console.log(err);
  }
}

getInfo();

module.exports = {getInfo};