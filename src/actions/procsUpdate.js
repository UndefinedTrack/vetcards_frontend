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

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const updateOwnerProcedureStarted = () => ({
  type: UPDATE_OWNER_PROCEDURE_REQUEST,
})

const updateOwnerProcedureSuccess = (petInfo) => ({
  type: UPDATE_OWNER_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const updateOwnerProcedureFailure = (error) => ({
  type: UPDATE_OWNER_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

const deleteOwnerProcedureStarted = () => ({
  type: DELETE_OWNER_PROCEDURE_REQUEST,
})

const deleteOwnerProcedureSuccess = (petInfo) => ({
  type: DELETE_OWNER_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const deleteOwnerProcedureFailure = (error) => ({
  type: DELETE_OWNER_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

const updateVetProcedureStarted = () => ({
  type: UPDATE_VET_PROCEDURE_REQUEST,
})

const updateVetProcedureSuccess = (petInfo) => ({
  type: UPDATE_VET_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const updateVetProcedureFailure = (error) => ({
  type: UPDATE_VET_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

const deleteVetProcedureStarted = () => ({
  type: DELETE_VET_PROCEDURE_REQUEST,
})

const deleteVetProcedureSuccess = (petInfo) => ({
  type: DELETE_VET_PROCEDURE_SUCCESS,
  payload: petInfo,
})

const deleteVetProcedureFailure = (error) => ({
  type: DELETE_VET_PROCEDURE_FAILURE,
  payload: {
    error,
  },
})

export const updateOwnerProc = (uid, procId, name, date, description, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('user', uid)
    data.append('pk', procId)
    data.append('name', name)
    data.append('proc_date', date)
    data.append('description', description)

    dispatch(updateOwnerProcedureStarted())

    fetch(`${API_URL}/cards/update_owner`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(updateOwnerProcedureSuccess(dat))
      })
      .catch((err) => dispatch(updateOwnerProcedureFailure(err.message)))
  }
}

export const deleteOwnerProc = (uid, procId, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('uid', uid)
    data.append('pid', procId)

    dispatch(deleteOwnerProcedureStarted())

    fetch(`${API_URL}/cards/delete_owner`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(deleteOwnerProcedureSuccess(dat))
      })
      .catch((err) => dispatch(deleteOwnerProcedureFailure(err.message)))
  }
}

export const updateVetProc = (uid, procId, purpose, name, symptoms, diagnosis, recomms, recipe, date, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('user', uid)
    data.append('pk', procId)
    data.append('purpose', purpose)
    data.append('name', name)
    data.append('symptoms', symptoms)
    data.append('diagnosis', diagnosis)
    data.append('recomms', recomms)
    data.append('recipe', recipe)
    data.append('proc_date', date)

    dispatch(updateVetProcedureStarted())

    fetch(`${API_URL}/cards/update_vet`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(updateVetProcedureSuccess(dat))
      })
      .catch((err) => dispatch(updateVetProcedureFailure(err.message)))
  }
}

export const deleteVetProc = (uid, procId, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('uid', uid)
    data.append('pid', procId)
    dispatch(deleteVetProcedureStarted())

    fetch(`${API_URL}/cards/delete_vet`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(deleteVetProcedureSuccess(dat))
      })
      .catch((err) => dispatch(deleteVetProcedureFailure(err.message)))
  }
}
