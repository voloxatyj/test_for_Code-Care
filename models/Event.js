const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
	start:{
		type: Number,
		required: true
	},
	duration:{
		type: Number,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: true
	},
	userID:{
		type: Number,
		required: true
	}
})

module.exports = Event = mongoose.model('event', EventSchema)