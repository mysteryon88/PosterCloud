import { ethers } from 'hardhat'

async function main() {
  const PosterCloud = await ethers.getContractFactory('PosterCloud')
  const posterCloud = await PosterCloud.deploy()

  await posterCloud.deployed()

  console.log(`PosterCloud deployed to ${posterCloud.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
