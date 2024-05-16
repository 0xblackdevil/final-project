import {
  CertificateUpdated as CertificateUpdatedEvent,
  DocumentUpdated as DocumentUpdatedEvent,
  SuperOwner as SuperOwnerEvent,
  UserAdded as UserAddedEvent
} from "../generated/Contract/Contract"
import {
  CertificateUpdated,
  DocumentUpdated,
  SuperOwner,
  UserAdded
} from "../generated/schema"

export function handleCertificateUpdated(event: CertificateUpdatedEvent): void {
  let entity = new CertificateUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.certificateId = event.params.certificateId
  entity.studentId = event.params.studentId
  entity.courseTitle = event.params.courseTitle
  entity.ipfsHash = event.params.ipfsHash
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDocumentUpdated(event: DocumentUpdatedEvent): void {
  let entity = new DocumentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.documentId = event.params.documentId
  entity.studentId = event.params.studentId
  entity.issuerId = event.params.issuerId
  entity.documentHash = event.params.documentHash
  entity.title = event.params.title
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSuperOwner(event: SuperOwnerEvent): void {
  let entity = new SuperOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userId = event.params.userId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserAdded(event: UserAddedEvent): void {
  let entity = new UserAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userId = event.params.userId
  entity.role = event.params.role

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
