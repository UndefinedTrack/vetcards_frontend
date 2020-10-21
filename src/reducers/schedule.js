import {
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  scheduleSlots: [],
  newSlot: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        scheduleSlots: action.payload,
      }
    case GET_SCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case CREATE_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_SCHEDULE_SUCCESS:
      return {
        loading: false,
        error: null,
        newSlot: action.payload,
      }
    case CREATE_SCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
