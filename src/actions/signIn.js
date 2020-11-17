import {
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  REFRESH_JWT_REQUEST,
  REFRESH_JWT_SUCCESS,
  REFRESH_JWT_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getMeStarted = () => ({
  type: GET_ME_REQUEST,
})

const getMeSuccess = (petInfo) => ({
  type: GET_ME_SUCCESS,
  payload: petInfo,
})

const getMeFailure = (error) => ({
  type: GET_ME_FAILURE,
  payload: {
    error,
  },
})

const refreshJWTStarted = () => ({
  type: REFRESH_JWT_REQUEST,
})

const refreshJWTSuccess = (petInfo) => ({
  type: REFRESH_JWT_SUCCESS,
  payload: petInfo,
})

const refreshJWTFailure = (error) => ({
  type: REFRESH_JWT_FAILURE,
  payload: {
    error,
  },
})

export const getMe = (token) => {
  return (dispatch, getState) => {
    dispatch(getMeStarted())

    fetch(`${API_URL}/auth/users/me/`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        const user = {
          email: data.email,
          userId: data.id,
          username: data.username,
        }

        dispatch(getMeSuccess(user))
      })
      .catch((err) => {
        window.location.href = '#/sign-in'
        localStorage.setItem('userReg', '')
        window.location.reload()
        dispatch(getMeFailure(err.statusText))
      })
  }
}

export const refreshJWT = (refresh) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('refresh', refresh)

    dispatch(refreshJWTStarted())

    fetch(`${API_URL}/auth/jwt/refresh`, { method: 'POST', body: data, credentials: 'include' })
      .then((resp) => resp.json())
      .then((dat) => dispatch(refreshJWTSuccess(dat)))
      .catch((err) => {
        console.log(err.statusText)
        dispatch(refreshJWTFailure(err.statusText))
      })
  }
}
