const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: '../config/config.env' })

function auth(req, res, next) {
	const token = req.headers.authorization
 
	// Check for token
	if(!token)res.status(401).json({ msg: 'No token, authorization denied'})
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.jwtSecret)
		req.user = decoded
		next()
	} catch (error) {
		res.status(400).json({ msg: 'Token is not valid' })
	}
}

module.exports = auth