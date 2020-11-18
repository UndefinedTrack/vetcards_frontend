import {
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  notifications: [],
  newNotif: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notifications: action.payload,
      }
    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case CREATE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        error: null,
        newNotif: action.payload,
      }
    case CREATE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
