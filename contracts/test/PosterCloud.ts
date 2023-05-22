import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('PosterCloud', function () {
  async function deployPosterCloudFixture() {
    const [owner, client1, client2] = await ethers.getSigners()

    const PosterCloud = await ethers.getContractFactory('PosterCloud')
    const posterCloud = await PosterCloud.deploy()
    const timestamp = Date.now()

    return { posterCloud, owner, client1, timestamp }
  }

  it('owner in storage', async function () {
    const { posterCloud, owner } = await loadFixture(deployPosterCloudFixture)

    expect(
      await ethers.provider.getStorageAt(await posterCloud.address, 0)
    ).to.equal(ethers.utils.hexZeroPad(owner.address, 32).toLowerCase())
  })

  it('getEventsCount = 0', async function () {
    const { posterCloud } = await loadFixture(deployPosterCloudFixture)

    expect(await posterCloud.getEventsCount()).to.equal(0)
  })

  it('onlyOwner', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(
      posterCloud.connect(client1).addEvent('Name', timestamp, 'info', 100)
    ).to.be.revertedWith('Caller is not owner')

    expect(await posterCloud.getEventsCount()).to.equal(0)
  })

  it('validEventId', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(posterCloud.deleteEvent(0)).to.be.revertedWith(
      'Event ID out of range'
    )
  })

  it('addEvent', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    expect(await posterCloud.getEventsCount()).to.equal(1)
  })

  it('getEvent', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    const nftAddress = await predictContractAddress(await posterCloud.address)
    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    const event = await posterCloud.getEvent(0)

    const formattedEvent = [
      event[0],
      event[1].toNumber(),
      event[2],
      event[3].toLowerCase(),
    ]

    expect(formattedEvent).to.deep.equal([
      'Name',
      timestamp,
      'info',
      nftAddress.toLowerCase(),
    ])
  })

  it('editEvent', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    const nftAddress = await predictContractAddress(posterCloud.address)
    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    await expect(
      posterCloud.editEvent(0, 'new name', timestamp, 'new info')
    ).to.emit(posterCloud, 'EventEdited')

    const event = await posterCloud.getEvent(0)

    const formattedEvent = [
      event[0],
      event[1].toNumber(),
      event[2],
      event[3].toLowerCase(),
    ]

    expect(formattedEvent).to.deep.equal([
      'new name',
      timestamp,
      'new info',
      nftAddress.toLowerCase(),
    ])
  })

  it('deleteEvent', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    await expect(posterCloud.deleteEvent(0)).to.emit(
      posterCloud,
      'EventDeleted'
    )

    expect(await posterCloud.getEventsCount()).to.equal(1)
  })

  it('mintTicket', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(posterCloud.addEvent('Name', timestamp, 'info', 100)).to.emit(
      posterCloud,
      'EventCreated'
    )

    await posterCloud.mintTicket(0, 'uri', client1.address)

    expect(await posterCloud.getEventsCount()).to.equal(1)
  })

  it('Sold out', async function () {
    const { posterCloud, owner, client1, timestamp } = await loadFixture(
      deployPosterCloudFixture
    )

    await expect(posterCloud.addEvent('Name', timestamp, 'info', 1)).to.emit(
      posterCloud,
      'EventCreated'
    )

    await posterCloud.mintTicket(0, 'uri', client1.address)

    await expect(
      posterCloud.mintTicket(0, 'uri', client1.address)
    ).to.be.revertedWith('Sold out')
  })
})

async function predictContractAddress(parentAddress: string): Promise<string> {
  const nonce = await ethers.provider.getTransactionCount(parentAddress)
  const rlpEncodedNonce = ethers.utils.RLP.encode([
    ethers.utils.hexlify(parentAddress),
    ethers.utils.hexlify(nonce),
  ])
  const raw = ethers.utils.keccak256(rlpEncodedNonce)
  const contractAddress = '0x' + raw.slice(-40)

  return contractAddress
}
