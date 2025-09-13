import { ethers } from 'ethers';
import { useWallet } from './wallet';

const NFPM_ADDRESS = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';
//const NFPM_ADDRESS = '0x1238536071E1c677A632429e3655c799b22cDA52';

const Factory_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c'; // Uniswap V3 Factory

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
];

const NFPM_ABI = [
  'function mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline) params) payable returns (uint256 tokenId,uint128 liquidity,uint256 amount0,uint256 amount1)',
];
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

export function getNFPMContract() {
  const { signer } = useWallet();
  console.log('Signerrrr:', signer);
  return new ethers.Contract(NFPM_ADDRESS, NFPM_ABI, signer);
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
