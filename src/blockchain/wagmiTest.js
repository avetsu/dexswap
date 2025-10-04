// import { readContract } from '@wagmi/core';
// import ERC20_ABI from './ERC20_ABI.json';
// import { config } from './configWagmi';

// const USDTAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

// export async function testbalance(address) {
//   const data = await readContract(config, {
//     abi: ERC20_ABI,
//     address: USDTAddress,
//     functionName: 'balanceOf',
//     args: [address],
//     chainId: 11155111,
//   });
//   return data;
// }

// import { WagmiAdapter, projectId } from 'configWagmi';
// import { createAppKit } from '@reown/appkit/vue';
// import { sepolia } from '@reown/appkit/networks';

// import { QueryClient, QueryClientProvider } from '@tanstack/vue-query';
// import { cookieToInitialState, WagmiProvider } from '@wagmi/vue';
// import { wagmiAdapter } from './configWagmi';

// const queryClient = new QueryClient();

// if (!projectId) {
//   throw new Error('You must provide a projectId');
// }

// const networks = [sepolia];

// const metadata = {
//   name: 'AppKit',
//   description: 'AppKit Example',
//   url: 'http://localhost:5173/',
//   icons: ['https://avatars.githubusercontent.com/u/179229932'],
// };

// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   networks: [sepolia],
//   defaultNetwork: sepolia,
//   features: {
//     analytics: true,
//   },
//   themeMode: 'light',
// });
