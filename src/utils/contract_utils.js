import { sepolia } from "viem/chains";
import CONTRACT_ABI from "../../graph/abi.json";

// const CONTRACT_ADDRESS = "0x32EEBA10f6E6D1E9F11E91aAB999E8Fb888abA3a";
const CONTRACT_ADDRESS = "0xC6f2Ed1d6248a08997FCf070EFE3E95cf8fD58e3";

const CONTRACT_CONF = {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    chainId: sepolia.id
};

export default CONTRACT_CONF;
export { CONTRACT_ADDRESS };