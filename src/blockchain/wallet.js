import { ref } from 'vue';
import { ethers } from 'ethers';

const account = ref(null);
let provider;
let signer;

export async function checkIfWalletIsConnected() {
  if (localStorage.getItem('disconnected') === 'true') {
    return;
  }

  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      account.value = accounts[0];
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    alert('Please install MetaMask!');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account.value = accounts[0];
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    localStorage.setItem('disconnected', 'false');
  } catch (err) {
    console.error('User rejected wallet connection', err);
  }
}

export function disconnectWallet() {
  account.value = null;
  provider = null;
  signer = null;
  localStorage.setItem('disconnected', 'true');
}

export function getSigner() {
  return signer;
}

export async function getWalletData() {
  if (typeof window.ethereum !== 'undefined') {
    await connectWallet();
  }
}

export function useWallet() {
  return { account, provider, signer, connectWallet, getWalletData };
}
