import axios from "axios";
import { useAccount, useWatchContractEvent } from "wagmi";
import CONTRACT_CONF from "../../utils/contract_utils";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function DocsComponent() {

    const [listOfRequest, setListOfRequest] = useState([]);

    useWatchContractEvent({
        ...CONTRACT_CONF,
        eventName: 'DocumentUpdated',
        onLogs() {
            fatchPendingDocuments();
        },
        onError(error) {
            console.log('Error', error)
        },
        syncConnectedChain: true
    })

    const account = useAccount();

    const fatchPendingDocuments = async () => {
        const response = await axios.post("https://api.studio.thegraph.com/query/52646/educational-records/v0.0.5", {
            query: `query getStudentDocuments {
                documentUpdateds(where: {studentId: "${account.address}", status: 1}) {
                    status
                    studentId
                    title
                    documentId
                    issuerId
                    id
                }
              }`,
        });

        setListOfRequest(response.data.data.documentUpdateds);
    }

    useEffect(() => { fatchPendingDocuments() }, []);

    return (
        <div className="px-20 py-10">
            <h1 className="text-5xl">Issued documents</h1>
            <table className="w-full mt-10 border-collapse border border-slate-500 table-auto">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Document Id</th>
                        <th className="border border-slate-600">Document Name</th>
                        <th className="border border-slate-600">Issuer Address</th>
                        <th className="border border-slate-600">Document Status</th>
                        <th>View Document</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfRequest.length === 0 && <tr><td colSpan="5" className="text-center">No document found</td></tr>}
                    {listOfRequest.map((docData, index) => <tr key={index}>
                        <td>{docData.documentId}</td>
                        <td>{docData.title}</td>
                        <td>{docData.issuerId}</td>
                        <td>{docData.status === 1 && "Approved"}</td>
                        <td className="text-center text-blue-800">
                            <FontAwesomeIcon icon={faLink} />
                        </td>
                    </tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default DocsComponent
