const express = require('express')
const authRouter = require('./routes/auth.routes')
const corsMiddleware = require('./middleware/cors.middleware')

require('dotenv').config()

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const start = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log('Server started on port ', process.env.PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
