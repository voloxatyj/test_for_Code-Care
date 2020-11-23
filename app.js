const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: './config/config.env' })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
// DB Start
connectDB()
// Use Routes
const events = require('./routes/api/events')
app.use('/api/events', events)
const users = require('./routes/api/users')
app.use('/api/users', users)
// Production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))