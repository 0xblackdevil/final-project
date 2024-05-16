import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CertificateUpdated } from "../generated/schema"
import { CertificateUpdated as CertificateUpdatedEvent } from "../generated/Contract/Contract"
import { handleCertificateUpdated } from "../src/contract"
import { createCertificateUpdatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let certificateId = BigInt.fromI32(234)
    let studentId = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let courseTitle = "Example string value"
    let ipfsHash = "Example string value"
    let status = 123
    let newCertificateUpdatedEvent = createCertificateUpdatedEvent(
      certificateId,
      studentId,
      courseTitle,
      ipfsHash,
      status
    )
    handleCertificateUpdated(newCertificateUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CertificateUpdated created and stored", () => {
    assert.entityCount("CertificateUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CertificateUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "certificateId",
      "234"
    )
    assert.fieldEquals(
      "CertificateUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "studentId",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CertificateUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "courseTitle",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificateUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ipfsHash",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificateUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "status",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
