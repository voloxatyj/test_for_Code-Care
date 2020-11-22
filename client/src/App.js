import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
// Redux Init
import { SET_AUTH, SET_USER } from './redux/types'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// Components
import { Navbar } from './components/layouts/Navbar'
import { SignIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { Calendar } from './components/pages/Calendar'
import { getEvents } from './redux/actions/dataActions'
import axios from 'axios'

const token = localStorage.getItem('token') || undefined
const user = JSON.parse(localStorage.getItem('user'))

if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    localStorage.removeItem('token')
    window.location.href='/signin'
  }
  axios.defaults.headers['Authorization'] = token
  store.dispatch({ type: SET_AUTH })
  store.dispatch({type: SET_USER,payload: user})
  const id = store.getState().data.user.id
  store.dispatch(getEvents(id))
}

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <div className="container-body">
          <Navbar />
          <Switch>
            <Route exact path='/calendar' component={Calendar} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}


