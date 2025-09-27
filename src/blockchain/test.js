import { ethers, BigNumber } from 'ethers';
import { Token, CurrencyAmount, Percent, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import InonfungiblePositionManagerABI from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import ERC20_ABI from './ERC20_ABI.json' assert { type: 'json' };
import FactoryABI from './FACTORY_ABI.json' assert { type: 'json' };
import { useWallet } from './wallet.js';
import JSBI from 'jsbi';

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

const chainId = 1;

const { provider, account } = useWallet();

const router = new AlphaRouter({ chainId: chainId, provider: provider });

const name0 = 'Wrapped Ether';
const symbol0 = 'WETH';
const decimals0 = 18;
const address0 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const name1 = 'Uniswap Token';
const symbol1 = 'UNI';
const decimals1 = 18;
const address1 = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

// const name0 = 'USDC';
// const symbol0 = 'USDC';
// const decimals0 = 6;
// const address0 = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

// const name1 = 'Wrapped Ether';
// const symbol1 = 'WETH';
// const decimals1 = 18;
// const address1 = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const UNI = new Token(chainId, address1, decimals1, symbol1, name1);

export const getWethContract = () => new ethers.Contract(address0, ERC20_ABI, provider);
export const getUniContract = () => new ethers.Contract(address1, ERC20_ABI, provider);

export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
  const percentSlippage = new Percent(slippageAmount, 100);
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));

  console.log('parameters', '1', currencyAmount, '2', UNI, '3', TradeType.EXACT_INPUT, '4', {
    recipient: account,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });
  const route = await router.route(currencyAmount, UNI, TradeType.EXACT_INPUT, {
    recipient: account,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });

  if (!route) {
    console.error('No route found. Check token addresses, chainId, or input amount.');
    return null;
  }

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);
  console.log([transaction, quoteAmountOut, ratio]);
  return [transaction, quoteAmountOut, ratio];
};

export const runSwap = async (transaction, signer) => {
  const approvalAmount = ethers.utils.parseUnits('10', 18).toString();
  const contract0 = getWethContract();
  await contract0.connect(signer).approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

  signer.sendTransaction(transaction);
};

console.log('done');
await getPrice(
  '10',
  2,
  Math.floor(Date.now() / 1000) + 60 * 10,
  '0x00BbCFD23c87a4b75aD9DC68b0dFbe8Ec04d2CB9',
);
