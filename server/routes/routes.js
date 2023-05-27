const Router = require('express')
require('dotenv').config()
const { ethers } = require('ethers')
const router = new Router()
const contractABI = require('./PosterCloud.json')

router.post('/addevent', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const contract = new ethers.Contract(
      process.env.ADDRESS,
      contractABI,
      provider
    )

    const { name, timestamp, info, totalTickets } = req.body
    console.log(name, timestamp, info, totalTickets)
    try {
      /*
      const tx = await contract
        .connect(wallet)
        .addEvent(name, timestamp, info, totalTickets)
*/
      const tx = await contract.getEventInfo(0)
      const receipt = await tx.wait()
      console.log('Transaction was successful:', receipt)
    } catch (error) {
      console.log('Error:', error)
    }

    res.json({ message: 'Event was created' })
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

module.exports = router
