import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED, 
  GET_USERS_REQUESTED,
  CLOSE_SNACKBAR,
 } from "../actions/constant";

const initialStates = {
  users: [],
  loading: false,
  message: '',
  open: false,
}

const users = (state = initialStates, action) => {
  switch(action.type) {
    case GET_USERS_REQUESTED:
      return{
        ...state,
        loading: true,
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
        message: 'Values Fetched!!',
        open: true
      }

    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
        open: true
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        open:false
      }

    default:
      return state
  }
}

export default users