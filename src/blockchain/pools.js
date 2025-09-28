import { ethers, BigNumber } from 'ethers';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import InonfungiblePositionManagerABI from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json';
import SwapRouter_ABI from './SWAP_ROUTER_ABI.json';
import ERC20_ABI from './ERC20_ABI.json';
import FactoryABI from './FACTORY_ABI.json';
import { useWallet } from './wallet';

export const NFPM_ADDRESS = '0x1238536071E1c677A632429e3655c799b22cDA52';
export const SWAP_ROUTER02_ADDRESS = '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E';
const Factory_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';
const QuoterV2_ADDRESS = '0xed1f6473345f45b75f8179591dd5ba1888cf2fb3';
const V3_SWAP_ROUTER_ADDRESS = '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E';

const chainID = 11155111;

const { provider } = useWallet();

const factory = new ethers.Contract(Factory_ADDRESS, FactoryABI, provider);

export async function approveTokens(tokenAddress, spender, amount) {
  const { signer } = useWallet();
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const tx = await token.approve(spender, amount);
  await tx.wait();
}

export function getNFPMContract() {
  const { signer } = useWallet();
  return new ethers.Contract(NFPM_ADDRESS, InonfungiblePositionManagerABI.abi, signer);
}

export async function getPoolAddress(token0Address, token1Address, feeTier) {
  const poolAddress = await factory.getPool(token0Address, token1Address, feeTier);
  return poolAddress;
}

export async function getPoolContract(token0Address, token1Address, feeTier) {
  const poolAddress = await getPoolAddress(token0Address, token1Address, feeTier);
  return new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);
}

export async function getPoolImmutables(poolContract) {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };
  return immutables;
}

export async function getQuote(tokenIn, tokenOut, fee, amountIn, sqrtPriceLimitX96) {
  const { provider } = useWallet();
  const QuoterV2Contract = new ethers.Contract(QuoterV2_ADDRESS, QuoterV2.abi, provider);
  const output = await QuoterV2Contract.callStatic.quoteExactInputSingle({
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    fee: fee,
    amountIn: amountIn,
    sqrtPriceLimitX96: sqrtPriceLimitX96,
  });
  return output;
}

export async function getToken(tokenAddress) {
  const { provider } = useWallet();
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const name = await token.name();

  return new Token(chainID, tokenAddress, decimals, symbol, name);
}

export async function getTokenBalance(tokenAddress) {
  const { provider, account } = useWallet();
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await token.balanceOf(account.value);
  return balance;
}

export async function getTokenDecimals(tokenAddress) {
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const decimals = await token.decimals();
  return decimals;
}

export async function getNFTData(tokenId) {
  const nfpmContract = getNFPMContract();
  const data = await nfpmContract.positions(tokenId);
  const tokenUri = await nfpmContract.tokenURI(tokenId);
  return { data, tokenUri };
}

export async function decreaseLiquidity(
  tokenId,
  liquidity,
  amount0Min,
  amount1Min,
  deadline,
  overrides = {},
) {
  const nfpmContract = getNFPMContract();
  const tx = await nfpmContract.decreaseLiquidity(
    {
      tokenId: ethers.BigNumber.from(tokenId.toString()),
      liquidity: ethers.BigNumber.from(liquidity.toString()),
      amount0Min: ethers.BigNumber.from(amount0Min.toString()),
      amount1Min: ethers.BigNumber.from(amount1Min.toString()),
      deadline: ethers.BigNumber.from(deadline.toString()),
    },
    overrides,
  );
  await tx.wait();
  return tx;
}

export async function increaseLiquidity(
  tokenId,
  amount0Desired,
  amount1Desired,
  amount0Min,
  amount1Min,
  deadline,
) {
  const nfpmContract = getNFPMContract();
  const tx = await nfpmContract.increaseLiquidity(
    {
      tokenId,
      amount0Desired,
      amount1Desired,
      amount0Min,
      amount1Min,
      deadline,
    },
    { value: 0 },
  );
  await tx.wait();
  return tx;
}

export async function poolExists(token0, token1, fee) {
  const poolAddress = await factory.getPool(token0, token1, fee);
  return poolAddress !== ethers.constants.AddressZero;
}

export async function transferTokens(tokenAddress, recipient, amount) {
  const { signer } = useWallet();
  const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

  const tx = await erc20.transfer(recipient, amount);

  const receipt = await tx.wait();

  return { tx, receipt };
}

export async function swapTokens(tokenIn, tokenOut, amountIn, fee, slippageAmount, deadline) {
  const poolAddress = await factory.getPool(tokenIn, tokenOut, fee);
  console.log('Pool address:', poolAddress);
  const poolContract = await getPoolContract(tokenIn, tokenOut, fee);
  const immutables = await getPoolImmutables(poolContract);
  const { signer, account } = useWallet();
  const router = new ethers.Contract(SWAP_ROUTER02_ADDRESS, SwapRouter_ABI, signer);
  const params = {
    tokenIn: immutables.token0,
    tokenOut: immutables.token1,
    fee: immutables.fee,
    recipient: account.value,
    deadline: deadline,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };
  const tx = await router.exactInputSingle(params, { gasLimit: 5000000 });
  await tx.wait();
  return tx;
}

export async function aT(tokenAddress, logoUrl) {
  const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  const [name, symbol, decimals] = await Promise.all([
    erc20.name(),
    erc20.symbol(),
    erc20.decimals(),
  ]);

  const newToken = {
    name,
    address: tokenAddress,
    chainId: 11155111,
    symbol,
    decimals: Number(decimals),
    logoURI: 'ogol',
  };

  console.log(JSON.stringify(newToken, null, 2));
  return newToken;
}
const SwapType = {
  UNIVERSAL_ROUTER: 0,
  SWAP_ROUTER_02: 1,
};

export async function multihopQuote(tokenA, tokenB, amount) {
  const { provider, account } = useWallet();
  const router = new AlphaRouter({ chainId: 11155111, provider: provider });
  const tokenIn = await getToken(tokenA);
  const tokenOut = await getToken(tokenB);
  const wei = ethers.utils.parseUnits(amount, tokenIn.decimals);
  const inputAmount = CurrencyAmount.fromRawAmount(tokenIn, wei);
  const route = await router.route(inputAmount, tokenOut, TradeType.EXACT_INPUT, {
    type: SwapType.SWAP_ROUTER_02,
    recipient: account.value,
    slippageTolerance: new Percent(25, 100),
    deadline: Math.floor(Date.now() / 1000 + 1800),
  });

  return route.quote.toFixed(6);
}

export async function multihopSwap(tokenA, tokenB, amount) {
  const { provider, account, signer } = useWallet();
  const router = new AlphaRouter({ chainId: 11155111, provider: provider });
  const tokenIn = await getToken(tokenA);
  const tokenOut = await getToken(tokenB);
  const wei = ethers.utils.parseUnits(amount, tokenIn.decimals);
  const inputAmount = CurrencyAmount.fromRawAmount(tokenIn, wei);
  const route = await router.route(inputAmount, tokenOut, TradeType.EXACT_INPUT, {
    type: SwapType.SWAP_ROUTER_02,
    recipient: account.value,
    slippageTolerance: new Percent(50, 10_000),
    deadline: Math.floor(Date.now() / 1000 + 1800),
  });
  console.log('route:', route);
  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: account.value,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };
  console.log('Transaction:', transaction);
  const tradeTransaction = await signer.sendTransaction(transaction);
  await tradeTransaction.wait();
  return tradeTransaction;
}
