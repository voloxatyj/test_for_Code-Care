const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
	const token = req.headers.authorization
 
	// Check for token
	if(!token)res.status(401).json({ msg: 'No token, authorization denied'})
	try {
		// Verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		req.user = decoded
		next()
	} catch (error) {
		res.status(400).json({ msg: 'Token is not valid' })
	}
}

module.exports = auth