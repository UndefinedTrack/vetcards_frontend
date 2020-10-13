import {
  CREATE_VET_PROCEDURE_REQUEST,
  CREATE_VET_PROCEDURE_SUCCESS,
  CREATE_VET_PROCEDURE_FAILURE,
  CREATE_OWNER_PROCEDURE_REQUEST,
  CREATE_OWNER_PROCEDURE_SUCCESS,
  CREATE_OWNER_PROCEDURE_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const createVetProcStarted = () => ({
  type: CREATE_VET_PROCEDURE_REQUEST,
})

const createVetProcSuccess = (petInfo) => ({
  type: CREATE_VET_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const createVetProcFailure = (error) => ({
  type: CREATE_VET_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

const createOwnerProcStarted = () => ({
  type: CREATE_OWNER_PROCEDURE_REQUEST,
})

const createOwnerProcSuccess = (petInfo) => ({
  type: CREATE_OWNER_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const createOwnerProcFailure = (error) => ({
  type: CREATE_OWNER_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

export const createVetProc = (pid, uid, purpose, symptoms, diagnosis, recomms, recipe) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pet', pid)
    data.append('user', uid)
    data.append('purpose', purpose)
    data.append('symptoms', symptoms)
    data.append('diagnosis', diagnosis)
    data.append('recomms', recomms)
    data.append('recipe', recipe)

    dispatch(createVetProcStarted())

    fetch(`${API_URL}/users/create_vet`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createVetProcSuccess(dat)))
      .catch((err) => dispatch(createVetProcFailure(err.message)))
  }
}

export const createOwnerProc = (pid, uid, name, description) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pet', pid)
    data.append('user', uid)
    data.append('name', name)
    data.append('description', description)

    dispatch(createOwnerProcStarted())

    fetch(`${API_URL}/users/create_owner`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createOwnerProcSuccess(dat)))
      .catch((err) => dispatch(createOwnerProcFailure(err.message)))
  }
}
