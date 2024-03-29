import { ethers } from 'hardhat'

async function main() {
  const PosterCloud = await ethers.getContractFactory('PosterCloud')
  const posterCloud = await PosterCloud.deploy()

  await posterCloud.deployed()

  console.log(`PosterCloud deployed to ${posterCloud.address}`)

  await posterCloud.addEvent('Name', Date.now(), 'info', 100)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
