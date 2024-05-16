import { useEffect, useState } from "react";
import { useAccount, useWatchContractEvent, useWriteContract } from "wagmi";
import DOCS_LIST from "../../utils/available_docs"
import CONTRACT_CONF from "../../utils/contract_utils";
import axios from "axios";

function RequestCompoent() {

    const account = useAccount();

    const [selectedOption, setSelectedOption] = useState("");
    const [listOfRequest, setListOfRequest] = useState([]);

    const selectDocumentOption = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

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

    const fatchPendingDocuments = async () => {
        const response = await axios.post("https://api.studio.thegraph.com/query/52646/educational-records/version/latest", {
            query: `query getStudentDocuments {
                documentUpdateds(where: {studentId: "${account.address}"}) {
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

    const { writeContractAsync } = useWriteContract();

    const submitRequest = () => {
        console.log(selectedOption);

        writeContractAsync({
            ...CONTRACT_CONF,
            functionName: 'requestDocument',
            args: [
                selectedOption
            ],
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className="px-20 py-10">
            <h1 className="text-5xl">Request for document</h1>
            <div className="mt-10">
                <h5><span className=" font-bold">Student Identity :</span> {account.address} </h5>
                <h5><span className=" font-bold">Institute Identity :</span> { } </h5>
            </div>

            <div className="mt-5 flex gap-3">
                <select id="dropdown" value={selectedOption} onChange={selectDocumentOption} placeholder="Select Require Document" className="px-5 py-2 border border-gray-200 rounded-full">
                    {DOCS_LIST.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <button type="submit" onClick={() => submitRequest()} className="bg-slate-950 text-white px-5 py-2 rounded-xl">Submit Document Request</button>
            </div>

            <table className="w-full mt-20 border-collapse border border-slate-500 table-auto">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Document Id</th>
                        <th className="border border-slate-600">Document Name</th>
                        <th className="border border-slate-600">Issuer Address</th>
                        <th className="border border-slate-600">Document Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfRequest.map((docData, index) => <tr key={index} className={`${docData.status === 1 ? "bg-green-400" : "bg-yellow-400"}`}>
                        <td>{docData.documentId}</td>
                        <td>{docData.title}</td>
                        <td>{docData.issuerId}</td>
                        <td>{docData.status === 0 ? "Pending" : "Approved"}</td>
                    </tr>)}
                </tbody>
            </table>

        </div >
    )
}

export default RequestCompoent