import axios from "axios";
import { useEffect, useState } from "react";
import CONTRACT_CONF from "../../utils/contract_utils";
import { useWatchContractEvent, useWriteContract } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import ipfsClient from "../../utils/ipfs_conf";

function DocsIssue() {

    const [listOfRequest, setListOfRequest] = useState([]);
    const [approvedDocs, setApprovedDocs] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const { writeContractAsync } = useWriteContract();

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
            query: `query fatchPendingDocs {
                documentUpdateds {
                  status
                  studentId
                  title
                  documentId
                }
              }`,
        });
        setListOfRequest(response.data.data.documentUpdateds);

        const removedIndex = await axios.post("https://api.studio.thegraph.com/query/52646/educational-records/version/latest", {
            query: `query fatchPendingDocs {
                documentUpdateds(where: {status: 1}) {
                  documentId
                }
              }`,
        });

        setApprovedDocs(removedIndex.data.data.documentUpdateds);

    }

    const onFileHandler = async (event) => {

        if (event.target.files.length === 0) {
            return alert("No files selected");
        }
        console.log("start to upload file");
        const file = event.target.files[0];
        const result = await ipfsClient.add(file);
        setImagePath(result.path);

        return alert(`File Uploaded : ${result.path}`);
    }

    useEffect(() => {
        fatchPendingDocuments();
    }, []);

    return (
        <div className="px-10 py-10">
            <h1 className="text-5xl">Document Request</h1>
            <table className="w-full mt-10 border-collapse border border-slate-500 table-auto">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Document Id</th>
                        <th className="border border-slate-600">Document Name</th>
                        <th className="border border-slate-600">Student Address</th>
                        <th className="border border-slate-600">Document Status</th>
                        <th>Upload Document</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfRequest.map((docData, index) => {
                        const isApproved = (approvedDocs.find(doc => doc.documentId === docData.documentId));
                        return isApproved === undefined && <tr key={index}>
                            <td>{docData.documentId}</td>
                            <td>{docData.title}</td>
                            <td>{docData.studentId}</td>
                            <td>{docData.status === 0 && "Pending"}</td>
                            <td className="p-3">
                                <div className="flex">
                                    <input type="file" name="file" className="m-0 p-0 border-none rounded-none" onChange={onFileHandler} />
                                    <button type="submit" className="text-slate-900 border-none" onClick={() => writeContractAsync({
                                        ...CONTRACT_CONF,
                                        functionName: 'provideDocument',
                                        args: [
                                            docData.documentId,
                                            imagePath
                                        ],
                                    }).then((response) => {
                                        console.log(response);
                                    })}>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    })}
                </tbody>
            </table>

        </div >

    )
}

export default DocsIssue