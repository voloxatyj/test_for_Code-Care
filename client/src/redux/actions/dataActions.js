import axios from 'axios'
import { ADD_EVENT, CLOSE_DIALOG } from '../types'

export const addEvent = (data,history) => dispatch => {
	// Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
	const body = JSON.stringify(data);

	axios.post('/api/events/addevent', body, config)
		.then(res => {
			dispatch({
				type: ADD_EVENT,
				payload: res.data.event
			})
			dispatch({type: CLOSE_DIALOG})
		})
		.catch(err => {
      console.log(err, 'ADD_EVENT_FAIL')
    });
}