const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('config')
const app = express()

// Enable cors
const corsOptions = {
  origin: config.get('frontend_URL'),
  credentials: true,
};
app.use(cors(corsOptions))

app.use(bodyParser.json())

// DB Start
connectDB()
// Use Routes
app.use('/api/events', require('./routes/api/events'))
app.use('/api/users', require('./routes/api/users'))
// Production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = config.get('port')
const PORT = port || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))