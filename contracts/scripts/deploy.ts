import { ethers } from 'hardhat'

async function main() {
  const PosterCloud = await ethers.getContractFactory('PosterCloud')
  const posterCloud = await PosterCloud.deploy()

  await posterCloud.deployed()

  console.log(`PosterCloud deployed to ${posterCloud.address}`)

  await posterCloud.addEvent('Name', Date.now(), 'info', 100)
  /*
  await posterCloud.mintTicket(
    0,
    'uri',
    '0x4eb6EBcfA62792A01E5005c453F39D63493a79B8'
  )
  */
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
