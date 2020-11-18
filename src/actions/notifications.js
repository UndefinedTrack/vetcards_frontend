import {
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const getNotificationsStarted = () => ({
  type: GET_NOTIFICATIONS_REQUEST,
})

const getNotificationsSuccess = (info) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: info,
})

const getNotificationsFailure = (error) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  payload: {
    error,
  },
})

const createNotificationStarted = () => ({
  type: CREATE_NOTIFICATION_REQUEST,
})

const createNotificationSuccess = (info) => ({
  type: CREATE_NOTIFICATION_SUCCESS,
  payload: info,
})

const createNotificationFailure = (error) => ({
  type: CREATE_NOTIFICATION_FAILURE,
  payload: {
    error,
  },
})

export const getNotifications = (pid, uid, token) => {
  return (dispatch, getState) => {
    dispatch(getNotificationsStarted())

    fetch(`${API_URL}/notifications/list?pid=${pid}&uid=${uid}`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const notifications = []
        const ninfo = data.notifications

        ninfo.forEach((notif) => {
          const notification = {
            notifId: notif.id,
            petId: notif.pet_id,
            userId: notif.user_id,
            description: notif.description,
            repeat: notif.repeat,
            date: notif.notif_date,
          }

          notifications.push(notification)
        })

        dispatch(getNotificationsSuccess(notifications))
      })
      .catch((err) => dispatch(getNotificationsFailure(err.message)))
  }
}

export const createNewNotification = (pid, uid, notifType, description, repeat, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('pet', pid)
    data.append('user', uid)
    data.append('notif_type', notifType)
    data.append('description', description)
    data.append('repeat', repeat)

    dispatch(createNotificationStarted())

    fetch(`${API_URL}/notifications/create`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => dispatch(createNotificationSuccess(dat)))
      .catch((err) => dispatch(createNotificationFailure(err.message)))
  }
}
