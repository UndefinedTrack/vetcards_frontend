import {
  GET_VET_PROCEDURES_REQUEST,
  GET_VET_PROCEDURES_SUCCESS,
  GET_VET_PROCEDURES_FAILURE,
  GET_OWNER_PROCEDURES_REQUEST,
  GET_OWNER_PROCEDURES_SUCCESS,
  GET_OWNER_PROCEDURES_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getVetProcsStarted = () => ({
  type: GET_VET_PROCEDURES_REQUEST,
})

const getVetProcsSuccess = (vetProcs) => ({
  type: GET_VET_PROCEDURES_SUCCESS,
  payload: vetProcs,
})

const getVetProcsFailure = (error) => ({
  type: GET_VET_PROCEDURES_FAILURE,
  payload: {
    error,
  },
})

const getOwnerProcsStarted = () => ({
  type: GET_OWNER_PROCEDURES_REQUEST,
})

const getOwnerProcsSuccess = (ownerProcs) => ({
  type: GET_OWNER_PROCEDURES_SUCCESS,
  payload: ownerProcs,
})

const getOwnerProcsFailure = (error) => ({
  type: GET_OWNER_PROCEDURES_FAILURE,
  payload: {
    error,
  },
})

export const getVetProcs = (pid, uid) => {
  return (dispatch, getState) => {
    dispatch(getVetProcsStarted())

    fetch(`${API_URL}/cards/get_vet?uid=${uid}&pid=${pid}` /* , { credentials: 'include' } */)
      .then((resp) => resp.json())
      .then((data) => {
        const procedures = []
        const pinfo = data.procedures

        pinfo.forEach((proc) => {
          const procedure = {
            procId: proc.id,
            petId: proc.pet_id,
            userId: proc.user_id,
            purpose: proc.purpose,
            symptoms: proc.symptoms,
            diagnosis: proc.diagnosis,
            recomms: proc.recomms,
            recipe: proc.recipe,
            procDate: proc.proc_date,
          }

          procedures.push(procedure)
        })

        dispatch(getVetProcsSuccess(procedures))
      })
      .catch((err) => dispatch(getVetProcsFailure(err.message)))
  }
}

export const getOwnerProcs = (pid, uid) => {
  return (dispatch, getState) => {
    dispatch(getOwnerProcsStarted())

    fetch(`${API_URL}/cards/get_owner?uid=${uid}&pid=${pid}`, { credentials: 'include' })
      .then((resp) => resp.json())
      .then((data) => {
        const procedures = []
        const pinfo = data.procedures

        pinfo.forEach((proc) => {
          const procedure = {
            procId: proc.id,
            petId: proc.pet_id,
            userId: proc.user_id,
            name: proc.name,
            description: proc.description,
            procDate: proc.proc_date,
          }

          procedures.push(procedure)
        })

        dispatch(getOwnerProcsSuccess(procedures))
      })
      .catch((err) => dispatch(getOwnerProcsFailure(err.message)))
  }
}
