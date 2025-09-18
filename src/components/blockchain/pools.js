import { ethers } from 'ethers';
import { Token } from '@uniswap/sdk-core';
import { useWallet } from './wallet';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import InonfungiblePositionManagerABI from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json';
import { fromReadableAmount } from './functions';

// const NFPM_ADDRESS = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';
export const NFPM_ADDRESS = '0x1238536071E1c677A632429e3655c799b22cDA52';

const Factory_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
];

// const NFPM_ABI = [
//   'function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline) params) payable returns (uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)',
//   'function createAndInitializePoolIfNecessary(address token0, address token1, uint24 fee, uint160 sqrtPriceX96) external payable returns (address pool)',
//   'function decreaseLiquidity((uint256 tokenId, uint128 liquidity, uint256 amount0min, uint256 amount1min, uint256 deadline) params) external payable returns(uint256 amount0, uint256 amount1)',
//   'function increaseLiquidity((uint256 tokenId, uint256 amount0Desired, uint256 amount1Desired, uint256 amount0Min, uint256 amount1Min, uint256 deadline) params) external payable returns (uint128 liquidity, uint256 amount0, uint256 amount1)',
// ];
const FactoryABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
    ],
    name: 'getPool',
    outputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const { provider } = useWallet();

const factory = new ethers.Contract(Factory_ADDRESS, FactoryABI, provider);

export async function getPoolAddress(token0Address, token1Address, feeTier) {
  const poolAddress = await factory.getPool(token0Address, token1Address, feeTier);
  return poolAddress;
}

export async function getPoolContract(token0Address, token1Address, feeTier) {
  const poolAddress = await getPoolAddress(token0Address, token1Address, feeTier);
  console.log('Pool address:', poolAddress);
  return new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);
}

export async function getTokenDecimals(tokenAddress) {
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const decimals = await token.decimals();
  return decimals;
}

export async function getToken(tokenAddress, chainId) {
  const { provider } = useWallet();
  console.log('address:', tokenAddress);
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const name = await token.name();

  return new Token(chainId, tokenAddress, decimals, symbol, name);
}

export function getNFPMContract() {
  const { signer } = useWallet();
  console.log('Signerrrr:', signer);
  return new ethers.Contract(NFPM_ADDRESS, InonfungiblePositionManagerABI.abi, signer);
}

export async function approveTokens(tokenAddress, spender, amount) {
  const { signer } = useWallet();
  console.log('signer:', signer);
  const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const tx = await token.approve(spender, amount);
  console.log(`Approving ${tokenAddress}... TX: ${tx.hash}`);
  await tx.wait();
  console.log('Approval confirmed');
}

export async function getQuote(tokenA, tokenB, amountA, decimals, fee) {
  const { provider } = useWallet();
  const poolAddress = await getPoolAddress(tokenA, tokenB, fee);
  const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);
  console.log('Pool address:', poolAddress);
  const [token0, token1, fee2, liquidity, slot0] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);
  const quoterContract = new ethers.Contract(
    '0xed1f6473345f45b75f8179591dd5ba1888cf2fb3',
    QuoterV2.abi,
    provider,
  );
  const quote = await quoterContract.callStatic.quoteExactInputSingle({
    tokenIn: tokenA,
    tokenOut: tokenB,
    fee: fee,
    amountIn: fromReadableAmount(amountA, decimals).toString(),
    sqrtPriceLimitX96: 0,
  });
  console.log(quote.amountOut);
  console.log('token0:', token0);
  console.log('token1:', token1);
  console.log('TokenA:', tokenA);
  console.log('TokenB:', tokenB);
  console.log('fee:', fee2);
  console.log('liquidity:', liquidity);
  console.log('slot0:', slot0);
  console.log('Quote:', quote);
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
  console.log('Decrease liquidity tx:', tx.hash);
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
  console.log('Increase liquidity tx:', tx.hash);
  return tx;
}
