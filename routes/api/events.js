const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
// Event Model
const Event = require('../../models/Event')

// @routes
// ADD EVENT
router.post('/addevent', async (req, res) => {
	try {
		const { title , start, duration, date, id } = req.body
		const event = new Event({ start , duration, title, date, id })
		await event.save()
		return res.json({ event: {
			id: event.id,
			start: event.start,
			duration: event.duration,
			title: event.title,
			date: event.date
		}})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: `Can add event` })
	}
})

module.exports = router