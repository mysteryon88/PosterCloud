const Router = require('express')
require('dotenv').config()
const { ethers } = require('ethers')
const router = new Router()
const contractABI = require('./PosterCloud.json')

router.post('/addevent', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const contractAddress = '0x051a94c9FA34dA2AAD44E1313BaF270e9d5f9Df7'

    const contract = new ethers.Contract(
      process.env.ADDRESS,
      contractABI,
      provider
    )

    const { name, timestamp, info, totalTickets } = req.body
    console.log(name, timestamp, info, totalTickets)
    try {
      const tx = await contract
        .connect(wallet)
        .addEvent(name, timestamp, info, totalTickets)

      const receipt = await tx.wait()
      console.log('Transaction was successful:', receipt)
    } catch (error) {
      console.log('Error:', error)
    }

    /*
    const transaction = {
      to: '0x0359D15a5abFdb1655168a45B8A93F4e200731a7',
      value: ethers.parseEther('0.1'),
    }

    const tx = await wallet.sendTransaction(transaction)
  */
    //console.log(req)

    res.json({ message: 'Event was created' })
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

module.exports = router
