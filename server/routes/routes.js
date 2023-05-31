const Router = require('express')
require('dotenv').config()
const { ethers } = require('ethers')
const router = new Router()
const contractABI = require('../../contracts/abi/contracts/PosterCloud.sol/PosterCloud.json')

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
      const tx = await contract
        .connect(wallet)
        .addEvent(name, timestamp, info, totalTickets)

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

router.post('/buytik', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const contract = new ethers.Contract(
      process.env.ADDRESS,
      contractABI,
      provider
    )

    const { eventId, addr } = req.body
    console.log(eventId, addr)
    try {
      const tx = await contract
        .connect(wallet)
        .mintTicket(
          eventId,
          'ipfs://QmajiHJ4N1horTkYg8Me2kjMhCQXqeqzARKmCj9zX4RzDp',
          addr
        )

      const receipt = await tx.wait()
      console.log('Transaction was successful:', receipt)
    } catch (error) {
      console.log('Error:', error)
    }

    res.json({ message: 'Тicket has been sent' })
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

router.post('/check', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    const contract = new ethers.Contract(
      process.env.ADDRESS,
      contractABI,
      provider
    )

    const { eventId, ticketId } = req.body
    console.log(eventId, ticketId)

    try {
      const tx = await contract.connect(wallet).checkTicket(eventId, ticketId)

      console.log('Transaction was successful:', tx)

      if (tx === false) {
        res.json({ message: 'ticket verified' })
        const tx1 = await contract.connect(wallet).setTicket(eventId, ticketId)
        console.log('Transaction was successful:', tx1)
      } else res.json({ message: 'ticket already used' })
    } catch (error) {
      console.log('Error:', error)
    }
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

module.exports = router
