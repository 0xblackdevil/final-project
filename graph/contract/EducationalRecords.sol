// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

contract EducationalRecords {
    //------------------- USER DEFINED VARIABLES -------------------//
    /// @notice Enumerables are used to restrict a variable to have only one of a predefined set of values
    enum Role {
        None, // default value at index 0, we don't want default role of users to be Student so we set a None value as default
        Student,
        Admin
    }

    enum Status {
        Pending, // none is not used since the default value of a document's status should be Pending
        Approved
    }

    // @notice User defined structs bundle variables of different data types together, used to define an objects properties/fields
    struct Document {
        string title; // provided by student during request
        address studentId; // provided by student during request
        address issuerId; // provided by admin/issuer during approval
        string documentHash; // provided by admin/issuer during approval
        Status status; // Pending during request, changes to Approved after approval
    }

    struct Certificate {
        string courseTitle; // provided by student during submission
        address studentId; // provided by student during submission
        string ipfsHash; // provided by student during submission
        Status status; // Pending during submission, changes to Approved after verification
    }

    //------------------- STATE VARIABLES -------------------//
    address public immutable i_superAdmin; // deployer of the contract

    // @notice mappings are used to store key-value pairs similar to HashMaps
    mapping(address userId => Role role) private users; // stores the role of the users (student or admin)
    mapping(uint256 documentId => Document documentDetails) private documents; // stores the information of all the documents in the format as stated above
    mapping(uint256 certificateId => Certificate certificateDetails) private certificates; // stores information on MOOC certificates submitted by the student

    //------------------- EVENTS -------------------//

    // Events are used for letting the frontend know some change has happened on the blockchain and consequently reflect it on the UI
    event DocumentUpdated(
        uint256 indexed documentId,
        address indexed studentId,
        address indexed issuerId,
        string documentHash,
        string title,
        Status status
    );
    event CertificateUpdated(
        uint256 indexed certificateId, address indexed studentId, string courseTitle, string ipfsHash, Status status
    );
    event UserAdded(address indexed userId, Role indexed role);
    event SuperOwner(address indexed userId);

    //------------------- MODIFIERS -------------------//

    // Modifiers are used for restricted access control
    modifier onlyAdmin(Role _role) {
        require(_role == Role.Admin, "Access restricted to admins!");
        _;
    }

    modifier onlyStudent(Role _role) {
        require(_role == Role.Student, "Access restricted to students!");
        _;
    }

    //------------------- PUBLIC FUNCTIONS -------------------//
    // @notice constructor is executed once upon contract deployment to initialize the any state variables required
    constructor() {
        i_superAdmin = msg.sender; // msg.sender is the person calling the function/sending the transaction
        users[msg.sender] = Role.Admin;
        emit SuperOwner(msg.sender);
    }

    // @notice Admins can add new users (admin or student)
    function addUser(address _userId, Role _role) public onlyAdmin(users[msg.sender]) {
        users[_userId] = _role;
        emit UserAdded(_userId, _role); // emit is used to "execute" events
    }

    // @notice Student can request documents from Admins by providing the title
    function requestDocument(string memory _title) public onlyStudent(users[msg.sender]) {
        uint256 documentId = block.timestamp; // block.timestamp returns the time at which the function is called in seconds, we use it to assign unique document IDs
        Document memory _document;
        _document.title = _title;
        _document.studentId = msg.sender;
        _document.status = Status.Pending;

        documents[documentId] = _document;
        emit DocumentUpdated(documentId, msg.sender, address(0), "", _title, Status.Pending);
    }

    // @notice Student can upload their MOOC certificates
    function uploadCertificate(string memory _courseTitle, uint256 _certificateId, string memory _ipfsHash)
        public
        onlyStudent(users[msg.sender])
    {
        Certificate memory _certificate = Certificate(_courseTitle, msg.sender, _ipfsHash, Status.Pending);

        certificates[_certificateId] = _certificate;
        emit CertificateUpdated(_certificateId, msg.sender, _courseTitle, _ipfsHash, Status.Pending);
    }

    // @notice Admin can fulfill the request for documents by uploading the file on IPFS and providing the hash
    function provideDocument(uint256 _documentId, string memory _documentHash) public onlyAdmin(users[msg.sender]) {
        documents[_documentId].issuerId = msg.sender;
        documents[_documentId].documentHash = _documentHash;
        documents[_documentId].status = Status.Approved;

        emit DocumentUpdated(
            _documentId,
            documents[_documentId].studentId,
            msg.sender,
            _documentHash,
            documents[_documentId].title,
            Status.Approved
        );
    }

    // @notice Admin can verify certificate by viewing the information provided by the student and visit the IPFS document
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

    // @notice Getter functions are used to get data from private functions
    function getDocumentDetails(uint256 _documentId) public view returns (Document memory _document) {
        _document = documents[_documentId];
    }

    function getCertificateDetails(uint256 _certificateId) public view returns (Certificate memory _certificate) {
        _certificate = certificates[_certificateId];
    }

    function getUserRole(address _userId) public view returns (Role _role) {
        _role = users[_userId];
    }
}
