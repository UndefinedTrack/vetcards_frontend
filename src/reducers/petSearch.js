import {
  GET_SEARCH_PETS_REQUEST,
  GET_SEARCH_PETS_SUCCESS,
  GET_SEARCH_PETS_FAILURE,
  // GET_SEARCH_VET_PROCS_REQUEST,
  // GET_SEARCH_VET_PROCS_SUCCESS,
  // GET_SEARCH_VET_PROCS_FAILURE,
  // GET_SEARCH_OWNER_PROCS_REQUEST,
  // GET_SEARCH_OWNER_PROCS_SUCCESS,
  // GET_SEARCH_OWNER_PROCS_FAILURE,
} from '../constants/ActionTypes'

const initialState = {
  loading: false,
  petsList: [],
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_PETS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_SEARCH_PETS_SUCCESS:
      return {
        loading: false,
        error: null,
        petsList: action.payload,
      }
    case GET_SEARCH_PETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
