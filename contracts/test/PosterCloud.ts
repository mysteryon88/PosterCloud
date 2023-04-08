import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('PosterCloud', function () {
  async function fixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const PosterCloud = await ethers.getContractFactory('PosterCloud')
    const posterCloud = await PosterCloud.deploy()

    return { posterCloud, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { posterCloud, owner } = await loadFixture(fixture)

      expect(await posterCloud.owner()).to.equal(owner.address)
    })
  })
})
