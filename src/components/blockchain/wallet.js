import { ref } from 'vue';
import { ethers } from 'ethers';

const account = ref(null);
let provider;
let signer;

export async function connectWallet() {
  if (!window.ethereum) {
    alert('Please install MetaMask!');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account.value = accounts[0];
  } catch (err) {
    console.error('User rejected wallet connection', err);
  }
}

export async function getWalletData() {
  if (typeof window.ethereum !== 'undefined') {
    await connectWallet();

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
}

export function useWallet() {
  return { account, provider, signer, connectWallet, getWalletData };
}

export function getSigner() {
  return signer;
}
