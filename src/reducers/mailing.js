import {
  SEND_MAILING_REQUEST,
  SEND_MAILING_FAILURE,
  SEND_MAILING_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MAILING_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEND_MAILING_SUCCESS:
      return {
          ...state,
          loading: false,
      }
    case SEND_MAILING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
