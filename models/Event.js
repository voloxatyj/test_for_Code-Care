const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const EventSchema = new Schema({
	start:{
		type: String,
		required: true
	},
	duration:{
		type: String,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	},
	id:{
		type: String,
		required: true
	}
})

module.exports = Event = mongoose.model('event', EventSchema)