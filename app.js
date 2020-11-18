const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const config = require('config')
const app = express()
// Cors Middleware
app.use(cors())

app.use(express.json())
// config
const port = config.get('port')
// DB Start
connectDB()
// Use Routes
app.use('/api/events', require('./routes/api/events'))
app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || port

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))