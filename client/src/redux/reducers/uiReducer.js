import { SET_AUTH, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED, OPEN_DIALOG, CLOSE_DIALOG, OPEN_VIEW, CLOSE_VIEW } from "../types"

const initialState = {
	auth : false,
	openView: false,
	openDialog: false,
	viewEvent: true,
	errors: {
		email: null,
		password: null,
		name: null, 
	},
	message: null
}

export default function(state=initialState, action) {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				auth: true
			}
		case SET_UNAUTHENTICATED:
			return {
				...state,
				auth: false
			}
		case SET_ERRORS:
			action.payload.errors.forEach(item=>state.errors[item.param]=item.msg)
			return {
				...state,
				message: action.payload.message
			}
		case OPEN_DIALOG:
			return {
				...state,
				openDialog: true
			}
		case CLOSE_DIALOG:
			return {
				...state,
				openDialog: false
			}
		case OPEN_VIEW:
			return {
				...state,
				openView: true
			}
		case CLOSE_VIEW:
			return {
				...state,
				openView: false
			}
		case CLEAR_ERRORS:
			return {
				...state,
				errors: {
					email: null,
					password: null,
					name: null,
				},
				message: null
			}
		default: 
			return state
	}
}