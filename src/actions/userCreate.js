import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const createUserStarted = () => ({
  type: CREATE_USER_REQUEST,
})

const createUserSuccess = (petInfo) => ({
  type: CREATE_USER_SUCCESS,
  payload: petInfo,
})

const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: {
    error,
  },
})

export const createUser = (username, password, firstName, patronymic, lastName, phone, email) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('first_name', firstName)
    data.append('patronymic', patronymic)
    data.append('last_name', lastName)
    data.append('phone', phone)
    data.append('email', email)

    dispatch(createUserStarted())

    fetch(`${API_URL}/users/create`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createUserSuccess(dat)))
      .catch((err) => dispatch(createUserFailure(err.message)))
  }
}
