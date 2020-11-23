import axios from 'axios'
import { ADD_EVENT, CLOSE_DIALOG, SET_ERRORS, SET_DATE, GET_EVENTS, DELETE_EVENT } from '../types'

export const addEvent = data => dispatch => {
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
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
      console.log(err, 'ADD_EVENT_FAIL')
    });
}

export const selectDate = date => dispatch => {
	dispatch({
		type: SET_DATE,
		payload: date
	})
}

export const getEvents = id => dispatch => {
	// Headers
  const config = {
		headers: {
			'Content-Type': 'application/json'
    }
  };
	axios.get(`/api/events/${id}`, config)
		.then(res => {
			dispatch({
				type: GET_EVENTS,
				payload: res.data.events
			})
		})
		.catch(err => console.log(err))
}

export const deleteEvent = (id) => dispatch => {
	// Headers
  const config = {
		headers: {
			'Content-Type': 'application/json'
    }
  };
	axios.delete(`/api/events/${id}`, config)
		.then(res =>
      dispatch({
        type: DELETE_EVENT,
        payload: id
      })
		)
		.catch(err =>
      console.log(err.response.data, err.response.status))
}

export const exportEvents = events => {
	events
		.forEach(event=>{
			event.start = (+event.start.slice(0,2)-8)*60 + +event.start.slice(3)
			delete event['date']
			delete event['endDate']
			delete event['id']
			delete event['startDate']
			delete event['_id']
			delete event['__v']
		})
	// Headers
  const config = {
		headers: {
			'Content-Type': 'application/json'
    }
  };
	axios.post('/api/events/export', events, config)
		.then(res=>console.log(res))
		.catch(err=>console.log(err.response.data))
}

export const checkEventTime = (event) => {
	switch (event.start) {
			case '13:00':
				return event.start = '1:00'
			case '13:30':
				return event.start = '1:30'
			case '14:00':
				return event.start = '2:00'
			case '14:30':
				return event.start = '2:30'
			case '15:00':
				return event.start = '3:00'
			case '15:30':
				return event.start = '3:30'
			case '16:00':
				return event.start = '4:00'
			case '16:30':
				return event.start = '4:30'
			case '17:00':
				return event.start = '5:00'
			default:
				return event.start
		}
}
