import {
  CREATE_VET_PROCEDURE_REQUEST,
  CREATE_VET_PROCEDURE_SUCCESS,
  CREATE_VET_PROCEDURE_FAILURE,
  CREATE_OWNER_PROCEDURE_REQUEST,
  CREATE_OWNER_PROCEDURE_SUCCESS,
  CREATE_OWNER_PROCEDURE_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  proc: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VET_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_VET_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case CREATE_VET_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case CREATE_OWNER_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_OWNER_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case CREATE_OWNER_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
