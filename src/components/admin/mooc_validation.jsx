
import axios from "axios";
import { useEffect, useState } from "react";
import { useWatchContractEvent, useWriteContract } from "wagmi";

import CONTRACT_CONF from "../../utils/contract_utils";
import { Link } from "react-router-dom";


function MoocResult() {

    const [listOfRequest, setListOfRequest] = useState([]);
    const [listOfApproved, setListOfApproved] = useState([]);

    const { writeContractAsync } = useWriteContract();

    useWatchContractEvent({
        ...CONTRACT_CONF,
        eventName: 'CertificateUpdated',
        onLogs() {
            fatchPendingDocuments();
        },
        onError(error) {
            console.log('Error', error)
        },
        syncConnectedChain: true
    })

    useEffect(() => {
        fatchPendingDocuments();
    }, [])

    const fatchPendingDocuments = async () => {
        const response = await axios.post("https://api.studio.thegraph.com/query/52646/educational-records/v0.0.5", {
            query: `query fatchPendingDocs {
                    certificateUpdateds {
                      id
                      certificateId
                      studentId
                      courseTitle
                      ipfsHash
                      status
                    }
              }`,
        });

        console.log(response)

        setListOfRequest(response.data.data.certificateUpdateds);

        const approvedCertifacts = await axios.post("https://api.studio.thegraph.com/query/52646/educational-records/v0.0.5", {
            query: `query fatchPendingDocs {
                certificateUpdateds(where: {status: 1}) {
                  certificateId
                }
              }`,
        });

        setListOfApproved(approvedCertifacts.data.data.certificateUpdateds);
    }


    return (
        <table className="w-full mt-10 border-collapse border border-slate-500 table-auto">
            <thead>
                <tr>
                    <th className="border border-slate-600">Document Issue Date</th>
                    <th className="border border-slate-600">Document Id</th>
                    <th className="border border-slate-600">Document Name</th>
                    <th className="border border-slate-600">Issuer Address</th>
                    <th className="border border-slate-600">Document Status</th>
                    <th>Approve it</th>
                </tr>
            </thead>
            <tbody>
                {listOfRequest.map((data, index) => {
                    const isApproved = (listOfApproved.find(doc => doc.certificateId === data.certificateId));
                    console.log(isApproved);
                    return isApproved === undefined && <tr key={index}>
                        <td>{data.certificateId}</td>
                        <td><Link to={"ipfs://" + data.ipfsHash}>{data.ipfsHash.slice(0, 5) + "..." + data.ipfsHash.slice(-5)}</Link></td>
                        <td>{data.courseTitle}</td>
                        <td>{data.studentId.slice(0, 5) + "..." + data.studentId.slice(-5)}</td>
                        <td>{data.status === 0 ? "Pending" : data.status === 1 && "Approve"}</td>
                        <td className="text-center"><button onClick={() => writeContractAsync({
                            ...CONTRACT_CONF,
                            functionName: 'verifyCertificate',
                            args: [
                                data.certificateId,
                            ],
                        }).then((response) => {
                            console.log(response);
                        })}>✅</button></td>
                    </tr>
                })}
            </tbody>
        </table >
    )
}

export default MoocResult