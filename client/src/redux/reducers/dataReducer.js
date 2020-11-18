import { SET_USER } from "../types"

const initialState = {
	user: null
}

export default function(state=initialState, action) {
	switch (action.payload) {
		case SET_USER:
			return {
				...state,
				user: action.payload
			}
		default:
			return state
	}
}