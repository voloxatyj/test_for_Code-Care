const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// Event Model
const User = require('../../models/User')
// JWT Secret
const jwtSecret = config.get('jwtSecret')
// Register User
router.post(
	'/register',
	[
		check('email', 'wrong email').isEmail(),
		check('password', 'Minimal length is 8 characters').isLength({min:8}),
		check('name', 'Minimal length is 4 characters').notEmpty().isLength({min:4}),
	], 
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect credentials'
			})
		}
		const { name , email, password } = req.body
		const candidate = await User.findOne({ email })
		if(candidate) return res.status(400).json({ errors: [{param: 'email', msg: 'Such email is already used'}],message: 'Such email is already used'})
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ name, email, password: hashedPassword })
		await user.save()
		const token = jwt.sign(
			{ userId: user.id },
			jwtSecret,
			{ expiresIn: '1h' }
		)
		return res.json({ token, user: {
			id: user.id,
			name: user.name,
			email: user.email
		}})
	} catch (error) {
		res.status(500).json({ message: `something goes wrong like ${error}` })
	}
})
// Login User
router.post(
	'/login', 
	[
		check('email', 'Wrong email').normalizeEmail().isEmail(),
		check('password', 'Password is incorrect or not exists').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Incorrect credentials'
			})
		}
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if(!user) return res.status(400).json({ errors: [{param: 'email', msg: 'User not find'}],message: 'User not find'})
		const isMatch = await bcrypt.compare(password, user.password)
		if(!isMatch) return res.status(400).json({ errors: [{param: 'password', msg: 'Password is incorrect'}],message: 'Password is incorrect'})
		const token = jwt.sign(
			{ userId: user.id },
			jwtSecret,
			{ expiresIn: '1h' }
		)
		return res.json({ token, user: {
			id: user.id,
			name: user.name,
			email: user.email
		}})
	} catch (error) {
		res.status(500).json({ message: `something goes wrong like ${error}` })
	}
})


module.exports = router