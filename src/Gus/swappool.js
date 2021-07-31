import Web3 from 'web3';
import uniswapPoolAbi from '../Info/abi/uniswap-v2.json';
import tokens from "../Info/token.json";
import BigNumber from 'bignumber.js'

const tokenInfo = tokens.mainnet;

class UniswapPool {
    web3 = null;
    poolContract = null;

    constructor(_account, _provider) {
        const provider = _provider;
        this.web3 = new Web3(provider);
        this.poolContract = new this.web3.eth.Contract(uniswapPoolAbi, tokenInfo.staking.contract);
        this.poolContract.setProvider(provider);
    }

    async getTotalSupply() {
      const totalSupply = await this.poolContract.methods.totalSupply().call();
      return this.toHuman(totalSupply, this.lpDecimals);
    }

    async getReserves() {
        const reserves = await this.poolContract.methods.getReserves().call();
        const ethAmount = this.toHuman(reserves[0], 18);
        const xBtcAmount = this.toHuman(reserves[1], tokenInfo.reward.decimals);
        return [ethAmount, xBtcAmount];
    }

    async computeUNIV2Equivalence(uniV2Amount) {
        const totalSupply = await this.getTotalSupply();
        const fraction = uniV2Amount / totalSupply;
        const reserves = await this.getReserves();
        return reserves.map((r) => r * fraction);
    }

    toHuman(num, decimals) {
        const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
        return humanNum.toNumber();
    }

    get lpDecimals() {
        return tokenInfo.staking.decimals;
    }
}

export default UniswapPool;
