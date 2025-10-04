import { ref, watch } from 'vue';
import { ethers } from 'ethers';
import { useAppKitProvider, useAppKitAccount, useDisconnect } from '@reown/appkit/vue';

export const AppKitAccount = useAppKitAccount();
const account = ref(null);
let provider;
let signer;

// export async function checkIfWalletIsConnected() {
//   if (localStorage.getItem('disconnected') === 'true') {
//     return;
//   }

//   if (typeof window.ethereum !== 'undefined') {
//     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//     if (accounts.length > 0) {
//       account.value = accounts[0];
//       provider = new ethers.providers.Web3Provider(window.ethereum);
//       signer = provider.getSigner();
//     }
//   }
// }

// export async function connectWallet() {
//   if (!window.ethereum) {
//     alert('Please install MetaMask!');
//     return;
//   }

//   try {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     account.value = accounts[0];
//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     signer = provider.getSigner();
//     localStorage.setItem('disconnected', 'false');
//   } catch (err) {
//     console.error('User rejected wallet connection', err);
//   }
// }

export async function connectWallet() {
  watch(
    () => AppKitAccount?.value?.isConnected, // only watch this property
    (isConnected) => {
      if (isConnected) {
        account.value = AppKitAccount.value.address;
        console.log('✅ Wallet connected:', AppKitAccount.value.address);
        console.log('AppKitAccount', AppKitAccount.value);
        const { walletProvider } = useAppKitProvider('eip155');
        console.log('connwallt', walletProvider);
        provider = new ethers.providers.Web3Provider(walletProvider);
        signer = provider.getSigner();
      } else {
        console.log('❌ Wallet not connected');
      }
    },
    { immediate: true },
  );
}

export async function disconnectWallet() {
  AppKitAccount.value = null;
  account.value = null;
  provider = null;
  signer = null;
  useDisconnect();
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

export function useWallet() {
  return { account, provider, signer };
}
