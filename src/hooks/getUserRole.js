import { useAccount, useReadContract } from "wagmi";
import CONTRACT_ADDRESS from "../utils/contract_utils";
import CONTRACT_ABI from "../../graph/abi.json";

function useGetUserRole() {

    const account = useAccount()

    const data = useReadContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "getUserRole",
        args: [account.address],
    });

    return data;
}

export default useGetUserRole;