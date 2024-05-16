
import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'
import CONTRACT_ADDRESS from './contract_utils'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EducationalRecords
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const educationalRecordsAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_userId', internalType: 'address', type: 'address' },
      {
        name: '_role',
        internalType: 'enum EducationalRecords.Role',
        type: 'uint8',
      },
    ],
    name: 'addUser',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'certificateId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'studentId',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'courseTitle',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'ipfsHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'status',
        internalType: 'enum EducationalRecords.Status',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'CertificateUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'documentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'studentId',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'title', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'status',
        internalType: 'enum EducationalRecords.Status',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'DocumentUpdated',
  },
  {
    type: 'function',
    inputs: [
      { name: '_documentId', internalType: 'uint256', type: 'uint256' },
      { name: '_documentHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'provideDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_title', internalType: 'string', type: 'string' }],
    name: 'requestDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_courseTitle', internalType: 'string', type: 'string' },
      { name: '_certificateId', internalType: 'uint256', type: 'uint256' },
      { name: '_ipfsHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'uploadCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'userId',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'role',
        internalType: 'enum EducationalRecords.Role',
        type: 'uint8',
        indexed: true,
      },
    ],
    name: 'UserAdded',
  },
  {
    type: 'function',
    inputs: [
      { name: '_certificateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'verifyCertificate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_certificateId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCertificateDetails',
    outputs: [
      {
        name: '_certificate',
        internalType: 'struct EducationalRecords.Certificate',
        type: 'tuple',
        components: [
          { name: 'courseTitle', internalType: 'string', type: 'string' },
          { name: 'studentId', internalType: 'address', type: 'address' },
          { name: 'ipfsHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'status',
            internalType: 'enum EducationalRecords.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_documentId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDocumentDetails',
    outputs: [
      {
        name: '_document',
        internalType: 'struct EducationalRecords.Document',
        type: 'tuple',
        components: [
          { name: 'title', internalType: 'string', type: 'string' },
          { name: 'studentId', internalType: 'address', type: 'address' },
          { name: 'issuerId', internalType: 'address', type: 'address' },
          { name: 'documentHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'status',
            internalType: 'enum EducationalRecords.Status',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_userId', internalType: 'address', type: 'address' }],
    name: 'getUserRole',
    outputs: [
      {
        name: '_role',
        internalType: 'enum EducationalRecords.Role',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link educationalRecordsAbi}__
 */
export const useReadEducationalRecords = /*#__PURE__*/ createUseReadContract({
  abi: educationalRecordsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"getCertificateDetails"`
 */
export const useReadEducationalRecordsGetCertificateDetails =
  /*#__PURE__*/ createUseReadContract({
  abi: educationalRecordsAbi,
  functionName: 'getCertificateDetails',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"getDocumentDetails"`
 */
export const useReadEducationalRecordsGetDocumentDetails =
  /*#__PURE__*/ createUseReadContract({
  abi: educationalRecordsAbi,
  functionName: 'getDocumentDetails',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"getUserRole"`
 */
export const useReadEducationalRecordsGetUserRole = (_user_address) => createUseReadContract({
  abi: educationalRecordsAbi,
  functionName: 'getUserRole',
  address: CONTRACT_ADDRESS,
  args: [_user_address],
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__
 */
export const useWriteEducationalRecords = /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"addUser"`
 */
export const useWriteEducationalRecordsAddUser =
  /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
  functionName: 'addUser',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"provideDocument"`
 */
export const useWriteEducationalRecordsProvideDocument =
  /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
  functionName: 'provideDocument',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"requestDocument"`
 */
export const useWriteEducationalRecordsRequestDocument =
  /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
  functionName: 'requestDocument',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"uploadCertificate"`
 */
export const useWriteEducationalRecordsUploadCertificate =
  /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
  functionName: 'uploadCertificate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"verifyCertificate"`
 */
export const useWriteEducationalRecordsVerifyCertificate =
  /*#__PURE__*/ createUseWriteContract({
  abi: educationalRecordsAbi,
  functionName: 'verifyCertificate',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__
 */
export const useSimulateEducationalRecords =
  /*#__PURE__*/ createUseSimulateContract({ abi: educationalRecordsAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"addUser"`
 */
export const useSimulateEducationalRecordsAddUser =
  /*#__PURE__*/ createUseSimulateContract({
  abi: educationalRecordsAbi,
  functionName: 'addUser',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"provideDocument"`
 */
export const useSimulateEducationalRecordsProvideDocument =
  /*#__PURE__*/ createUseSimulateContract({
  abi: educationalRecordsAbi,
  functionName: 'provideDocument',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"requestDocument"`
 */
export const useSimulateEducationalRecordsRequestDocument =
  /*#__PURE__*/ createUseSimulateContract({
  abi: educationalRecordsAbi,
  functionName: 'requestDocument',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"uploadCertificate"`
 */
export const useSimulateEducationalRecordsUploadCertificate =
  /*#__PURE__*/ createUseSimulateContract({
  abi: educationalRecordsAbi,
  functionName: 'uploadCertificate',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link educationalRecordsAbi}__ and `functionName` set to `"verifyCertificate"`
 */
export const useSimulateEducationalRecordsVerifyCertificate =
  /*#__PURE__*/ createUseSimulateContract({
  abi: educationalRecordsAbi,
  functionName: 'verifyCertificate',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link educationalRecordsAbi}__
 */
export const useWatchEducationalRecordsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: educationalRecordsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link educationalRecordsAbi}__ and `eventName` set to `"CertificateUpdated"`
 */
export const useWatchEducationalRecordsCertificateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
  abi: educationalRecordsAbi,
  eventName: 'CertificateUpdated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link educationalRecordsAbi}__ and `eventName` set to `"DocumentUpdated"`
 */
export const useWatchEducationalRecordsDocumentUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
  abi: educationalRecordsAbi,
  eventName: 'DocumentUpdated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link educationalRecordsAbi}__ and `eventName` set to `"UserAdded"`
 */
export const useWatchEducationalRecordsUserAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
  abi: educationalRecordsAbi,
  eventName: 'UserAdded',
})
