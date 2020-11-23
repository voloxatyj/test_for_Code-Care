const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: './config.env' })

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		})
		console.log(`Mongoose is connect ${conn.connection.host}`)
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB