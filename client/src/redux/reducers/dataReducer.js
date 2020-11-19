import { SET_USER, ADD_EVENT } from "../types"

const initialState = {
	user: null,
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
			state.events.push(action.payload)
			return {
				...state,
			}
		default:
			return state
	}
}