import { SET_USER, ADD_EVENT, SET_DATE, GET_EVENTS, DELETE_EVENT } from "../types"
import { checkEventTime } from '../actions/dataActions'

const initialState = {
	user: null,
	date: null,
	events: []
}

export default function(state=initialState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload
 		}
		case ADD_EVENT:
			checkEventTime(action.payload.start)
			return {
				...state,
				events: [...state.events, action.payload]
			}
		case GET_EVENTS:
			action.payload.forEach(item=>checkEventTime(item))
			return {
				...state,
				events: [...action.payload]
			}
		case DELETE_EVENT:
			state.events.filter(item=>item._id !== action.payload)
			return {
				...state,
				events: [...state.events]
			}
		case SET_DATE:
			return {
				...state,
				date: action.payload
			}
		default:
			return state
	}
}