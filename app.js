const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
// Cors Middleware
app.use(cors())
// Bodyparser Middleware
app.use(bodyParser.json())
// config
const port = require('./config/keys').port
const events = require('./routes/api/events')
// DB Start
connectDB()

app.use('/api/events', events)

const PORT = process.env.PORT || port

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))