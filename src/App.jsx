/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar"
import LendingPage from "./screens/lending.page";
import AdminPage from "./screens/admin.page";
import StudentPage from "./screens/student.page";
import { useAccount, useAccountEffect, useWatchContractEvent } from "wagmi";
import { setUserRole } from "./redux/auth_slice";

import CONTRACT_CONF from "./utils/contract_utils";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [userRole, setUserRoleFromChain] = useState([]);
  const account = useAccount();

  useWatchContractEvent({
    ...CONTRACT_CONF,
    eventName: 'UserAdded',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    onError(error) {
      console.log('Error', error)
    },
    syncConnectedChain: true
  })

  const fatchUserState = async () => {
    const response = await axios.post("https://api.studio.thegraph.com/query/75466/education/v0.0.1", {
      query: `query fatchPendingDocs {
        userAddeds(where: {userId: "${account.address}"}) {
          role
          userId
        }
      }`,
    });

    setUserRoleFromChain(response.data.data.userAddeds);
  }

  useEffect(() => {
    fatchUserState();
  }, [])

  useAccountEffect({
    async onConnect() {
      userRole.length === 0 && dispatch(setUserRole(null));
      userRole.length > 0 && userRole[0].role === 1 && dispatch(setUserRole("student"));
      userRole.length > 0 && userRole[0].role === 2 && dispatch(setUserRole("admin"));
    },
    onDisconnect() {
      dispatch(setUserRole(null))
    },
  })

  console.log(userRole)


  return (
    <>
      <Navbar />
      {userRole.length === 0 && <LendingPage />}
      {userRole.length > 0 && userRole[0].role === 1 && <StudentPage />}
      {userRole.length > 0 && userRole[0].role === 2 && <AdminPage />}
    </>
  )
}

export default App