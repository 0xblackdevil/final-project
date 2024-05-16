// import { useWriteContract } from "wagmi"

import { useState } from "react";
import { useWriteContract } from "wagmi";
import CONTRACT_CONF from "../../utils/contract_utils";

function UserManagment() {
    const { writeContractAsync } = useWriteContract();

    const [useraddress, setUserAddress] = useState('');
    const [role, setRole] = useState('');

    const createUserOnChain = async () => {
        const contractResponse = await writeContractAsync({
            ...CONTRACT_CONF,
            functionName: 'addUser',
            args: [
                useraddress,
                role,
            ],
        })

        console.log(contractResponse);
    }

    return (
        <div className="px-20 py-10">
            <h1 className="text-5xl">Admit Student / Admin</h1>

            <div className="mt-10">
                <input type="text" placeholder="Enter User Address (0x0)" className="w-1/5" required onChange={(e) => setUserAddress(e.target.value)} value={useraddress} />

                <div className="flex gap-5 items-cetner mt-3">
                    <p >Assign a role : </p>
                    <label htmlFor="role">
                        <input type="radio" name="role" value="admin" onChange={() => setRole(2)} />
                        <span className="ml-3" />
                        Admin</label>

                    <label htmlFor="role">
                        <input type="radio" name="role" value="student" onChange={() => setRole(1)} />
                        <span className="ml-3" />
                        Student </label>
                </div>

                <button className="bg-slate-900 text-white px-5 py-2 rounded-lg mt-3" onClick={() => createUserOnChain()} type="submit">Create User</button>
            </div>
        </div>
    )
}

export default UserManagment