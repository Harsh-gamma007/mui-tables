import {
  CLOSE_SNACKBAR,
  GET_USERS_REQUESTED 
} from "./constant";

export function getUsers() {
  return {
    type: GET_USERS_REQUESTED,
  }
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR
  }
}