const ethers = require('ethers');
var provider = new ethers.providers.WebSocketProvider("wss://bsc-ws-node.nariox.org:443");

const master_address = "0xc618ff7ad37ff51d2b00c50c92f2e4a1e03990cb"

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
const master_oracle = "0x456b450f7d9e033418ae26c357f8b83ad3d1f172";
const master = "0x4CA2679f6518693213b646c29ef149E0707123B9";
const guh = "0x42069C0CF4DA25420fC4C9d9001ba5af7846CCfd";

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