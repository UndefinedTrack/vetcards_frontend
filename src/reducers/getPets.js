import {
  GET_PETS_LIST_REQUEST,
  GET_PETS_LIST_SUCCESS,
  GET_PETS_LIST_FAILURE,
  GET_PATIENTS_LIST_REQUEST,
  GET_PATIENTS_LIST_SUCCESS,
  GET_PATIENTS_LIST_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  petsList: [],
  patientsList: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PETS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PETS_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        petsList: action.payload,
      }
    case GET_PETS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case GET_PATIENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PATIENTS_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        patientsList: action.payload,
      }
    case GET_PATIENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
