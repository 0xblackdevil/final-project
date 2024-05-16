import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CertificateUpdated,
  DocumentUpdated,
  SuperOwner,
  UserAdded
} from "../generated/Contract/Contract"

export function createCertificateUpdatedEvent(
  certificateId: BigInt,
  studentId: Address,
  courseTitle: string,
  ipfsHash: string,
  status: i32
): CertificateUpdated {
  let certificateUpdatedEvent = changetype<CertificateUpdated>(newMockEvent())

  certificateUpdatedEvent.parameters = new Array()

  certificateUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "certificateId",
      ethereum.Value.fromUnsignedBigInt(certificateId)
    )
  )
  certificateUpdatedEvent.parameters.push(
    new ethereum.EventParam("studentId", ethereum.Value.fromAddress(studentId))
  )
  certificateUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "courseTitle",
      ethereum.Value.fromString(courseTitle)
    )
  )
  certificateUpdatedEvent.parameters.push(
    new ethereum.EventParam("ipfsHash", ethereum.Value.fromString(ipfsHash))
  )
  certificateUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return certificateUpdatedEvent
}

export function createDocumentUpdatedEvent(
  documentId: BigInt,
  studentId: Address,
  issuerId: Address,
  documentHash: string,
  title: string,
  status: i32
): DocumentUpdated {
  let documentUpdatedEvent = changetype<DocumentUpdated>(newMockEvent())

  documentUpdatedEvent.parameters = new Array()

  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "documentId",
      ethereum.Value.fromUnsignedBigInt(documentId)
    )
  )
  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam("studentId", ethereum.Value.fromAddress(studentId))
  )
  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam("issuerId", ethereum.Value.fromAddress(issuerId))
  )
  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "documentHash",
      ethereum.Value.fromString(documentHash)
    )
  )
  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  documentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return documentUpdatedEvent
}

export function createSuperOwnerEvent(userId: Address): SuperOwner {
  let superOwnerEvent = changetype<SuperOwner>(newMockEvent())

  superOwnerEvent.parameters = new Array()

  superOwnerEvent.parameters.push(
    new ethereum.EventParam("userId", ethereum.Value.fromAddress(userId))
  )

  return superOwnerEvent
}

export function createUserAddedEvent(userId: Address, role: i32): UserAdded {
  let userAddedEvent = changetype<UserAdded>(newMockEvent())

  userAddedEvent.parameters = new Array()

  userAddedEvent.parameters.push(
    new ethereum.EventParam("userId", ethereum.Value.fromAddress(userId))
  )
  userAddedEvent.parameters.push(
    new ethereum.EventParam(
      "role",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  )

  return userAddedEvent
}
