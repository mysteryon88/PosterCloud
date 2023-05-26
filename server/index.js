const express = require('express')
const router = require('./routes/routes')
const corsMiddleware = require('./middleware/cors.middleware')

require('dotenv').config()

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use('/api', router)

const start = () => {
  try {
    let i = 42 // Замените 0 на ваше число
    console.log(computeHash(i))
    app.listen(process.env.PORT, () => {
      console.log('Server started on port ', process.env.PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
