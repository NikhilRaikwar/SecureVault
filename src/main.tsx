import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createConfig, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createPublicClient, http } from 'viem';
import App from './App.tsx';
import './index.css';

const config = createConfig({
  chains: [mainnet],
  client: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </StrictMode>
);