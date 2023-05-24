const Router = require('express')
require('dotenv').config()
const { ethers } = require('ethers')
const router = new Router()

router.post('/registration', async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    /*
    const transaction = {
      to: '0x0359D15a5abFdb1655168a45B8A93F4e200731a7',
      value: ethers.parseEther('0.1'),
    }

    const tx = await wallet.sendTransaction(transaction)
  */
    console.log(req)

    res.json({ message: 'User was created' })
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    return res.json({})
  } catch (e) {
    console.log(e)
    res.send({ message: 'Server error' })
  }
})

module.exports = router
