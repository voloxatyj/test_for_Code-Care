import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import dataReducer from './dataReducer'

export const reducer = combineReducers({
	ui: uiReducer,
	data: dataReducer
})