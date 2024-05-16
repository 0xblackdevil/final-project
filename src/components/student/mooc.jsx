/* eslint-disable react-hooks/exhaustive-deps */
import ipfsClient from "../../utils/ipfs_conf";
import { useEffect, useState } from "react";
import { useAccount, useWatchContractEvent, useWriteContract } from "wagmi";

import CONTRACT_CONF from "../../utils/contract_utils";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MoocComponent() {
    const [imagePath, setImagePath] = useState(null);

    const { writeContractAsync } = useWriteContract();

    const [listOfRequest, setListOfRequest] = useState([]);

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

    const account = useAccount();

    const fatchPendingDocuments = async () => {
        const response = await axios.post("https://api.studio.thegraph.com/query/75466/education/v0.0.1", {
            query: `query fatchPendingDocs {
                certificateUpdateds(where: {studentId: "${account.address}"}) {
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
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        // console.log(e.target.title.value);
        // console.log(e.target.duration.value);
        // console.log(e.target.details.value);
        // console.log(e.target.doc_name.value);
        // console.log(imagePath);

        const contractResponse = await writeContractAsync({
            ...CONTRACT_CONF,
            functionName: 'uploadCertificate',
            args: [
                e.target.title.value,
                Date.now(),
                imagePath
            ],
        })

        console.log(contractResponse);

        e.target.reset();
        setImagePath(null);
    }

    useEffect(() => {
        fatchPendingDocuments();
    }, []);

    const onFileHandler = async (event) => {
        if (event.target.files.length === 0) {
            return alert("No files selected");
        }
        console.log("start to upload file");
        const file = event.target.files[0];
        const result = await ipfsClient.add(file);
        setImagePath(result.path);
    }

    return (
        <div className="px-10 py-10">
            <h1 className="text-5xl">MOOC Application Form</h1>

            <div className="flex gap-5">
                <div className="p-5 bg-white drop-shadow-xl rounded-xl mt-10">

                    <form action="" className="flex flex-col gap-5" onSubmit={handleFormSubmission}>
                        <input type="text" name="title" placeholder="MOOC Title" required />
                        <input type="text" name="duration" placeholder="Course Duration (In Hourse)" required />
                        <input type="text" name="details" placeholder="MOOC Details" required />

                        <div className="bg-black text-white py-1 text-center">Certificate Uploading</div>

                        <input type="text" name="doc_name" placeholder="Enter Document Name" required />
                        {!imagePath ? <input className="border-0 p-0 rounded-none" type="file" name="file" onChange={onFileHandler} /> : <p>{imagePath}</p>}

                        <div>
                            <button className="bg-blue-500 text-white py-2 px-5 rounded-lg">Submit</button>
                            <button className="bg-red-500 text-white py-2 px-5 rounded-lg ml-5">Clear</button>
                        </div>
                    </form>

                </div>

                <div>

                    <table className="w-full mt-10 border-collapse border border-slate-500 table-auto">
                        <thead>
                            <tr>
                                <th className="border border-slate-600">Document Issue Date</th>
                                <th className="border border-slate-600">Document Id</th>
                                <th className="border border-slate-600">Document Name</th>
                                <th className="border border-slate-600">Issuer Address</th>
                                <th className="border border-slate-600">Document Status</th>
                                <th>View Document</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfRequest.map((data, index) => <tr key={index}>
                                <td>{data.certificateId}</td>
                                <td>{data.ipfsHash.slice(0, 5) + "..." + data.ipfsHash.slice(-5)}</td>
                                <td>{data.courseTitle}</td>
                                <td>{data.studentId.slice(0, 5) + "..." + data.studentId.slice(-5)}</td>
                                <td>{data.status === 0 ? "Pending" : data.status === 1 && "Approve"}</td>
                                <td className="text-center"><Link to={`ipfs://${data.ipfsHash}`}><FontAwesomeIcon icon={faLink} /></Link></td>
                            </tr>)}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}

export default MoocComponent