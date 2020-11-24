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

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const searchPetsStarted = () => ({
  type: GET_SEARCH_PETS_REQUEST,
})

const searchPetsListSuccess = (pets) => ({
  type: GET_SEARCH_PETS_SUCCESS,
  payload: pets,
})

const searchPetsFailure = (error) => ({
  type: GET_SEARCH_PETS_FAILURE,
  payload: {
    error,
  },
})

export const searchPets = (uid, name, token) => {
  return (dispatch, getState) => {
    dispatch(searchPetsStarted())

    fetch(`${API_URL}/pets/search?uid=${uid}&name=${name}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const patients = []

        const pinfo = data.patients

        pinfo.forEach((pt) => {
          const patient = {
            patient: pt.patient,
            owner: pt.owner,
            ownerId: pt.owner_id,
            card: pt.card,
            color: pt.color,
            birthDate: pt.birth_date,
            gender: pt.gender,
            chip: pt.chip,
            avatar: pt.avatar,
          }

          patients.push(patient)
        })

        dispatch(searchPetsListSuccess(patients))
      })
      .catch((err) => dispatch(searchPetsFailure(err.message)))
  }
}
