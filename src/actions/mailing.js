import {
  SEND_MAILING_REQUEST,
  SEND_MAILING_FAILURE,
  SEND_MAILING_SUCCESS
} from '../constants/ActionTypes'

import {
  API_URL,
  // TEST_API_URL
} from '../constants/constants'

const sendMailingStarted = () => ({
  type: SEND_MAILING_REQUEST,
})

const sendMailingSuccess = (info) => ({
  type: SEND_MAILING_SUCCESS,
  payload: info,
})

const sendMailingFailure = (error) => ({
  type: SEND_MAILING_FAILURE,
  payload: {
    error,
  }
})

export const sendMailing = (region, city, street, subject, message, token) => {
  return (dispatch, getState) => {
    const data = new FormData()
    data.append('region', region)
    data.append('city', city)
    data.append('street', street)
    data.append('subject', subject)
    data.append('message', message)
    dispatch(sendMailingStarted())

    fetch(`${API_URL}/notifications/broadcast`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((dat) => {
        dispatch(sendMailingSuccess(dat))
      })
      .catch((err) => dispatch(sendMailingFailure(err.message)))
  }
}
