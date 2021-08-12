const ethers = require('ethers');
// var provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org");
const config = require("../Info/gus.json");

const master_abi = [
  "function rebase() external",
  "function cooldownExpiryTimestamp() public view returns (uint256)",
  "function getRebaseValues() public view returns (uint256, int256)",
  "function targetRate() public view returns (uint256)",
];

const master_oracle_abi = [
  "function getData() external view returns (uint256)",
];

const guh_abi = [
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address who) external view returns (uint256)",
];

const master_iface = new ethers.utils.Interface(master_abi);
const master_oracle_iface = new ethers.utils.Interface(master_oracle_abi);
const guh_iface = new ethers.utils.Interface(guh_abi);

const cooldownExpiryTimestamp = master_iface.encodeFunctionData("cooldownExpiryTimestamp");
const getRebaseValues = master_iface.encodeFunctionData("getRebaseValues");
const targetRate = master_iface.encodeFunctionData("targetRate");
const getData = master_oracle_iface.encodeFunctionData("getData");
const totalSupply = guh_iface.encodeFunctionData("totalSupply");
const master_oracle = config.MarketOracle;
const master = config.Master;
const guh = config.Token;

const writeRebase = async() => {
  const bep20 = new ethers.Contract(master, master_abi, provider);
  await bep20.rebase();
}
const getInfo = async (rebaseTimeCallback, rebaseValueCallback, targetRateCallback, dataCallback, totalSupplyCallback, balanceOfCallback, address) => {
  
  try {
    var res = await provider.call({
      to: master,
      data: cooldownExpiryTimestamp
    });
    const expiry_ts = master_iface.decodeFunctionResult("cooldownExpiryTimestamp", res);
    const ts = parseInt(expiry_ts);
    rebaseTimeCallback(ts);
    
    res = await provider.call({
      to: master,
      data: getRebaseValues
    });
    const rebase_val = master_iface.decodeFunctionResult("getRebaseValues", res);
    rebaseValueCallback(rebase_val)
    
    res = await provider.call({
      to: master,
      data: targetRate
    });
    const target_rate = master_iface.decodeFunctionResult("targetRate", res);
    targetRateCallback(target_rate);

    res = await provider.call({
      to: master_oracle,
      data: getData
    });
    const data = master_oracle_iface.decodeFunctionResult("getData", res);
    dataCallback(data);

    res = await provider.call({
      to: guh,
      data: totalSupply
    });
    const total_supply = guh_iface.decodeFunctionResult("totalSupply", res);
    totalSupplyCallback(total_supply);

    if (address) {
      const balanceOf = guh_iface.encodeFunctionData("balanceOf", [address]);
      res = await provider.call({
        to: guh,
        data: balanceOf
      });
      const balance = guh_iface.decodeFunctionResult("balanceOf", res);
      balanceOfCallback(balance);
    }

  }catch(err) {
    console.log(err);
  }
}

// getInfo();

module.exports = {getInfo, writeRebase};