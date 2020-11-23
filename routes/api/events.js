const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { db } = require('../../models/Event')
const fs = require('fs')
const path = require('path');
// Event Model
const Event = require('../../models/Event')

// @routes
// ADD EVENT
router.post('/addevent', auth, async (req, res) => {
	try {
		const { duration, date, id, title, start } = req.body
    let hours = Math.floor(duration/60)
    let minutes = Math.round(duration/60 - hours)
    const endDate = `${date}T${+start.slice(0,2)+hours}:${+start.slice(3)+minutes === 0 ? '00' : +start.slice(3)+minutes}`
    const startDate = `${date}T${start}`
		if(+startDate.slice(11,13)<8 || +endDate.slice(11,13)>17) return res.status(400).json({ errors: [{param: 'event', msg: 'Not correct time'}]})
		const event = new Event({ startDate , duration, title, date, id, endDate, start })
		await event.save()
		return res.json({ event: {
			startDate: event.startDate,
			endDate: event.endDate,
			title: event.title,
			duration: event.duration,
			start: event.start,
			id: event.id,
			date: event.date
		}})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: `Can add event` })
	}
})

// Get Events
router.get('/:id', auth, async (req, res) => {
	try {
		const events = await db.collection("events").find({ id : req.params.id}).toArray()
		if(!events) console.log('No events was created by user')
		await res.status(200).json({events});
	} catch (error) {
		res.status(400).json({ msg: error.message, success: false })
	}

})

// Delete Events
router.delete('/:id', auth, async (req,res) => {
	try {
		const event = await Event.findById(req.params.id)
		if(!event) throw Error('No event found')
		const deletedEvent = await event.remove()
		if(!deletedEvent)throw Error('Something went wrong while trying to delete the item');
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false })
  }
})

// Export Events
router.post('/export', auth, async (req,res) => {
	try {
		const events = await JSON.stringify(req.body)
		fs.writeFile(path.resolve(__dirname + '/events.json'), events, ()=>{
			res.status(200).json({ success: true })
		})
	} catch (error) {
		res.status(400).json({ msg: error.message, success: false })
	}
})
module.exports = router