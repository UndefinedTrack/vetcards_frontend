import {
  UPDATE_OWNER_PROCEDURE_REQUEST,
  UPDATE_OWNER_PROCEDURE_SUCCESS,
  UPDATE_OWNER_PROCEDURE_FAILURE,
  DELETE_OWNER_PROCEDURE_REQUEST,
  DELETE_OWNER_PROCEDURE_SUCCESS,
  DELETE_OWNER_PROCEDURE_FAILURE,
  UPDATE_VET_PROCEDURE_REQUEST,
  UPDATE_VET_PROCEDURE_SUCCESS,
  UPDATE_VET_PROCEDURE_FAILURE,
  DELETE_VET_PROCEDURE_REQUEST,
  DELETE_VET_PROCEDURE_SUCCESS,
  DELETE_VET_PROCEDURE_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  proc: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OWNER_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_OWNER_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case UPDATE_OWNER_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case DELETE_OWNER_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_OWNER_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case DELETE_OWNER_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case UPDATE_VET_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_VET_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case UPDATE_VET_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case DELETE_VET_PROCEDURE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_VET_PROCEDURE_SUCCESS:
      return {
        loading: false,
        error: null,
        proc: action.payload,
      }
    case DELETE_VET_PROCEDURE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
