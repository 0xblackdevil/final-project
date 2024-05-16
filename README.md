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

```js
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

```js
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

```js
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

```js
modifier onlyAdmin(Role _role) {
    require(_role == Role.Admin, "Access restricted to admins!");
    _;
}

modifier onlyStudent(Role _role) {
    require(_role == Role.Student, "Access restricted to students!");
    _;
}
```

- `onlyAdmin`: Restricts function access to admins.
- `onlyStudent`: Restricts function access to students.

## Events

```js
event DocumentUpdated(uint256 indexed documentId, address indexed studentId, string title, Status status);
event CertificateUpdated(
    uint256 indexed certificateId, address indexed studentId, string courseTitle, string ipfsHash, Status status
);
event UserAdded(address indexed userId, Role indexed role);
event SuperOwner(address indexed userId);
```

- `DocumentUpdated`: Emitted when a document is updated.
- `CertificateUpdated`: Emitted when a certificate is updated.
- `UserAdded`: Emitted when a new user is added.

## Public Functions

### Constructor

```js
constructor() {
    i_superAdmin = msg.sender;
    users[msg.sender] = Role.Admin;
    emit SuperOwner(msg.sender);
}
```

- Sets the deploying address as the super admin.


### Student Functions

```js
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

```js
function addUser(address _userId, Role _role) public onlySuperAdmin {
    users[_userId] = _role;
    emit UserAdded(_userId, _role);
}

function provideDocument(uint256 _documentId, string memory _documentHash) public onlyAdmin(users[msg.sender]) {
    documents[_documentId].issuerId = msg.sender;
    documents[_documentId].documentHash = _documentHash;
    documents[_documentId].status = Status.Approved;

    emit DocumentUpdated(
        _documentId, documents[_documentId].studentId, documents[_documentId].title, Status.Approved
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
- `addUser`: Adds a new user with a specified role.

## View/Pure Functions

```js
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

- **Super Admin**: Deployer of the contract.
- **Admin**: Can add users, approve documents and verify certificates.
- **Student**: Can request documents and upload certificates.
