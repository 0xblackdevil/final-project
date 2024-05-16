# EducationalRecords Smart Contract Documentation

## Overview

The `EducationalRecords` smart contract is designed to manage educational documents and certificates on the Ethereum blockchain. It allows for the secure creation, management, and verification of documents and certificates by students and administrators.

## Table of Contents

1. [Contract Structure](#contract-structure)
2. [State Variables](#state-variables)
3. [Modifiers](#modifiers)
4. [Events](#events)
5. [Public Functions](#public-functions)
6. [View/Pure Functions](#viewpure-functions)
7. [Roles and Permissions](#roles-and-permissions)
8. [Example Usage](#example-usage)

## Contract Structure

The contract is divided into several key components:

- **User Roles:** Defines the roles of users (None, Student, Admin).
- **Document and Certificate Status:** Defines the status of documents and certificates (Pending, Approved).
- **Structs:** Defines the structure for Document and Certificate.
- **State Variables:** Stores information about users, documents, and certificates.
- **Modifiers:** Access control for functions.
- **Events:** Logs significant actions.
- **Public Functions:** Allow users to interact with the contract.
- **View/Pure Functions:** Provide read-only access to contract data.

## State Variables

### Enums

```solidity
enum Role {
    None,
    Student,
    Admin
}

enum Status {
    Pending,
    Approved
}
```

### Structs

```solidity
struct Document {
    string title;
    address studentId;
    address issuerId;
    string documentHash;
    Status status;
}

struct Certificate {
    string courseTitle;
    address studentId;
    string ipfsHash;
    Status status;
}
```

### State Variables

```solidity
address immutable i_superAdmin;

mapping(address => Role) private users;
mapping(uint256 => Document) private documents;
mapping(uint256 => Certificate) private certificates;
```

- `i_superAdmin`: Address of the super admin, immutable after contract deployment.
- `users`: Mapping of user addresses to their roles.
- `documents`: Mapping of document IDs to Document structs.
- `certificates`: Mapping of certificate IDs to Certificate structs.

## Modifiers

```solidity
modifier onlySuperAdmin() {
    require(msg.sender == i_superAdmin, "Access restricted to super admin!");
    _;
}

modifier onlyAdmin(Role _role) {
    require(_role == Role.Admin, "Access restricted to admins!");
    _;
}

modifier onlyStudent(Role _role) {
    require(_role == Role.Student, "Access restricted to students!");
    _;
}
```

- `onlySuperAdmin`: Restricts function access to the super admin.
- `onlyAdmin`: Restricts function access to admins.
- `onlyStudent`: Restricts function access to students.

## Events

```solidity
event DocumentUpdated(uint256 indexed documentId, address indexed studentId, string title, Status status);
event CertificateUpdated(
    uint256 indexed certificateId, address indexed studentId, string courseTitle, string ipfsHash, Status status
);
event UserAdded(address indexed userId, Role indexed role);
```

- `DocumentUpdated`: Emitted when a document is updated.
- `CertificateUpdated`: Emitted when a certificate is updated.
- `UserAdded`: Emitted when a new user is added.

## Public Functions

### Constructor

```solidity
constructor() {
    i_superAdmin = msg.sender;
}
```

- Sets the deploying address as the super admin.

### Super Admin Functions

```solidity
function addUser(address _userId, Role _role) public onlySuperAdmin {
    users[_userId] = _role;
    emit UserAdded(_userId, _role);
}
```

- `addUser`: Adds a new user with a specified role.

### Student Functions

```solidity
function requestDocument(string memory _title) public onlyStudent(users[msg.sender]) {
    Document memory _document;
    _document.title = _title;
    _document.studentId = msg.sender;
    _document.status = Status.Pending;

    documents[block.timestamp] = _document;
    emit DocumentUpdated(block.timestamp, msg.sender, _title, Status.Pending);
}

function uploadCertificate(string memory _courseTitle, uint256 _certificateId, string memory _ipfsHash)
    public
    onlyStudent(users[msg.sender])
{
    Certificate memory _certificate = Certificate(_courseTitle, msg.sender, _ipfsHash, Status.Pending);

    certificates[_certificateId] = _certificate;
    emit CertificateUpdated(_certificateId, msg.sender, _courseTitle, _ipfsHash, Status.Pending);
}
```

- `requestDocument`: Allows a student to request a new document.
- `uploadCertificate`: Allows a student to upload a certificate.

### Admin Functions

```solidity
function provideDocument(uint256 _documentId, string memory _documentHash) public onlyAdmin(users[msg.sender]) {
    documents[_documentId].issuerId = msg.sender;
    documents[_documentId].documentHash = _documentHash;
    documents[_documentId].status = Status.Approved;

    emit DocumentUpdated(
        block.timestamp, documents[_documentId].studentId, documents[_documentId].title, Status.Approved
    );
}

function verifyCertificate(uint256 _certificateId) public onlyAdmin(users[msg.sender]) {
    certificates[_certificateId].status = Status.Approved;

    emit CertificateUpdated(
        _certificateId,
        certificates[_certificateId].studentId,
        certificates[_certificateId].courseTitle,
        certificates[_certificateId].ipfsHash,
        Status.Approved
    );
}
```

- `provideDocument`: Allows an admin to approve and provide a document.
- `verifyCertificate`: Allows an admin to verify a certificate.

## View/Pure Functions

```solidity
function getDocumentDetails(uint256 _documentId) public view returns (Document memory _document) {
    _document = documents[_documentId];
}

function getCertificateDetails(uint256 _certificateId) public view returns (Certificate memory _certificate) {
    _certificate = certificates[_certificateId];
}

function getUserRole(address _userId) public view returns (Role _role) {
    _role = users[_userId];
}
```

- `getDocumentDetails`: Retrieves details of a specific document.
- `getCertificateDetails`: Retrieves details of a specific certificate.
- `getUserRole`: Retrieves the role of a specific user.

## Roles and Permissions

- **Super Admin**: Can add users with specific roles.
- **Admin**: Can approve documents and verify certificates.
- **Student**: Can request documents and upload certificates.

## Example Usage

### Deploying the Contract

1. Deploy the contract with the deploying address as the super admin.

### Adding Users

```solidity
// As super admin
addUser(0x123..., Role.Student);
addUser(0x456..., Role.Admin);
```

### Requesting a Document (Student)

```solidity
// As student
requestDocument("Transcript of Records");
```

### Providing a Document (Admin)

```solidity
// As admin
provideDocument(1625142600, "Qm..."); // Example documentId and documentHash
```

### Uploading a Certificate (Student)

```solidity
// As student
uploadCertificate("Blockchain Course", 1, "Qm...");
```

### Verifying a Certificate (Admin)

```solidity
// As admin
verifyCertificate(1);
```

### Retrieving Details

```solidity
// Anyone
getDocumentDetails(1625142600);
getCertificateDetails(1);
getUserRole(0x123...);
```

This documentation provides an overview of the `EducationalRecords` contract, detailing its structure, state variables, modifiers, events, functions, roles, and example usage. This should help users understand how to interact with and utilize the contract effectively.
