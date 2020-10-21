import {
  GET_VET_PROCEDURES_REQUEST,
  GET_VET_PROCEDURES_SUCCESS,
  GET_VET_PROCEDURES_FAILURE,
  GET_OWNER_PROCEDURES_REQUEST,
  GET_OWNER_PROCEDURES_SUCCESS,
  GET_OWNER_PROCEDURES_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  vetProcs: [],
  ownerProcs: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VET_PROCEDURES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_VET_PROCEDURES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        vetProcs: action.payload,
      }
    case GET_VET_PROCEDURES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case GET_OWNER_PROCEDURES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_OWNER_PROCEDURES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ownerProcs: action.payload,
      }
    case GET_OWNER_PROCEDURES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
