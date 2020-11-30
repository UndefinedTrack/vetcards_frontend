import {
  GET_AVATAR_REQUEST,
  GET_AVATAR_SUCCESS,
  GET_AVATAR_FAILURE,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getAvatarStarted = () => ({
  type: GET_AVATAR_REQUEST,
})

const getAvatarSuccess = (info) => ({
  type: GET_AVATAR_SUCCESS,
  payload: info,
})

const getAvatarFailure = (error) => ({
  type: GET_AVATAR_FAILURE,
  payload: {
    error,
  },
})

const uploadAvatarStarted = () => ({
  type: UPLOAD_AVATAR_REQUEST,
})

const uploadAvatarSuccess = (info) => ({
  type: UPLOAD_AVATAR_SUCCESS,
})

const uploadAvatarFailure = (error) => ({
  type: UPLOAD_AVATAR_FAILURE,
  payload: {
    error,
  },
})

export const getUserAvatar = (avatarURL, token) => {
  return (dispatch, getState) => {
    dispatch(getAvatarStarted())

    fetch(`${API_URL}${avatarURL}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.blob())
      .then((data) => {
        const avatarFullURL = URL.createObjectURL(data)
        dispatch(getAvatarSuccess(avatarFullURL))
      })
      .catch((err) => dispatch(getAvatarFailure(err.message)))
  }
}

export const uploadUserAvatar = (uid, token, image) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pk', uid)
    data.append('avatar', image)

    dispatch(uploadAvatarStarted())

    fetch(`${API_URL}/users/avatar`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(uploadAvatarSuccess(dat))
      })
      .catch((err) => dispatch(uploadAvatarFailure(err.message)))
  }
}

const petavatars = []
export const getPetAvatar = (pid, avatarURL, token) => {
  return (dispatch, getState) => {
    dispatch(getAvatarStarted())

    fetch(`${API_URL}${avatarURL}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.blob())
      .then((data) => {
        const avatarFullURL = URL.createObjectURL(data)
        petavatars[pid] = avatarFullURL
        dispatch(getAvatarSuccess(petavatars))
      })
      .catch((err) => dispatch(getAvatarFailure(err.message)))
  }
}

export const uploadPetAvatar = (uid, pid, token, image) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('user', uid)
    data.append('pk', pid)
    data.append('avatar', image)

    dispatch(uploadAvatarStarted())

    fetch(`${API_URL}/pets/avatar`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        petavatars[pid] = dat.pet_avatar.avatar
        dispatch(uploadAvatarSuccess(petavatars))
      })
      .catch((err) => dispatch(uploadAvatarFailure(err.message)))
  }
}
