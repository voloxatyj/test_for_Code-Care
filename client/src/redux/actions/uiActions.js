import { SET_USER, SET_AUTH, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED } from "../types"
import axios from 'axios'

// Register
export const signupUser = (data, history) => dispatch => {
	// Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
	const body = JSON.stringify(data);
	
	axios.post('/api/users/register', body, config)
		.then(res => {
			setAuthorizationHeader(res.data.token)
			localStorage.setItem('user', JSON.stringify(res.data.user))
			dispatch({
				type: SET_USER,
				payload: res.data.user
			})
			dispatch({type: SET_AUTH})
			dispatch({type: CLEAR_ERRORS})
			history.push('/calendar')
		})
		.catch(err => {
      dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
      console.log(err.response.status, 'REGISTER_FAIL')
    });
}

//Login
export const loginUser = (data, history) => dispatch => {
	// Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
	const body = JSON.stringify(data);
	
	axios.post('/api/users/login', body, config)
		.then(res => {
    	localStorage.setItem('user', JSON.stringify(res.data.user))
			setAuthorizationHeader(res.data.token)
			dispatch({
				type: SET_USER,
				payload: res.data.user
			})
			dispatch({type: SET_AUTH})
			dispatch({type: CLEAR_ERRORS})
			history.push('/calendar')
		})
		.catch(err => {
      dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
      console.log(err.response.status, 'LOGIN_FAIL')
    });
}

export const setAuthorizationHeader = token => {
	const Token = token
	localStorage.setItem('token', Token)
	axios.defaults.headers.common['x-auth-token'] = Token
}

export const logoutUser = history => dispatch => {
	localStorage.removeItem('token')
	delete axios.defaults.headers.common['x-auth-token']
	dispatch({ type: SET_UNAUTHENTICATED })
	history.push('/signin')
}