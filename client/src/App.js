import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
// import jwtDecode from 'jwt-decode'
import { SET_AUTH, SET_USER } from './redux/types'

// Redux Init
import { Provider } from 'react-redux'
import { store } from './redux/store'

// const token = localStorage.getItem('token') || undefined
// const user = JSON.parse(localStorage.getItem('userData'))

// if(token){
//   const decodedToken = jwtDecode(token)
//   if(decodedToken.exp * 1000 < Date.now()){
//     localStorage.removeItem('token')
//     window.location.href='/signin'
//   }
//   store.dispatch({ type: SET_AUTH })
//   store.dispatch({type: SET_USER,payload: user})
// }

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <h1>Hello</h1>
        </div>
      </Provider>
    </Router>
  );
}


