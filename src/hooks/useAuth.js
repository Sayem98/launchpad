import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/web3React";

export default function useAuth() {
  const { activate, deactivate, web3React } = useWeb3React();
  console.log(web3React);
  const login = () => {
    activate(injectedConnector);
  };
  const logout = () => {
    deactivate();
  };
  return { login, logout };
}
