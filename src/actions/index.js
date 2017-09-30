import axios from 'axios'
import { browserHistory } from 'react-router'
import * as types from './types'

const API_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  // Returning a function instead of an object here,
  // because we are using the redux-thunk middleware which allows this.
  // Inside this function we can directly access the 'dispatch',
  // function and use it to dispatch actions in anyway we want.
  return function(dispatch) {
    // Submit email and password to the server.
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: types.AUTH_USER })

        // - Save the JWT token so user can make follow up requests
        localStorage.setItem('token', response.data.token)

        // - Redirect the user to /feature
        browserHistory.push('/feature')
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))    
      })
    
    }
 
 }

export function signoutUser() {
  // Remove token from localstorage.
  localStorage.removeItem('token')

  // Send out an action to signout user.
  return {
    type: types.UNAUTH_USER
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature')
      })
      .catch((response) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Email is already in use'))    
      })
  }
}
 
function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, { 
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch({ type: types.FETCH_MESSAGE, payload: response.data.message })
    })    
  }
}
