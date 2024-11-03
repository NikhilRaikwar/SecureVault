import { useAccount } from 'wagmi';

export function useAuth() {
  const { address, isConnected } = useAccount();

  return {
    address,
    isAuthorized: isConnected,
  };
}