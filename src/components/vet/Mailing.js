import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/Mailing.module.css'
import { sendMailing } from '../../actions/mailing'

function Mailing({ sendMail }) {
  const token = localStorage.getItem('token')

  const [state, setState] = useState({
    region: '',
    city: '',
    street: '',
    subject: '',
    message: '',
  })

  function changeInputHandler(event) {
    event.persist()
    setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }))
  }

  function submitHandler(event) {
    event.preventDefault()
    sendMail(state.region, state.city, state.street, state.subject, state.message, token)
    const elem = document.getElementById('pop-up-send-mail')
    elem.style = 'display: flex;'
    setTimeout(() => {
      elem.style = 'display: none;'
    }, 3000)
    setState({
      region: '',
      city: '',
      street: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className={styles.mailingSpace}>
      <div className={styles.mailingWrapper}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Address
            changeInputHandler={changeInputHandler}
            region={state.region}
            city={state.city}
            street={state.street}
          />
          <MailingText changeInputHandler={changeInputHandler} subject={state.subject} message={state.message} />
          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
          <div className={styles.PopUp} id="pop-up-send-mail">
            Отправлено!
          </div>
        </form>
      </div>
    </div>
  )
}

Mailing.propTypes = {
  sendMail: PropTypes.func.isRequired,
}

function Address({ changeInputHandler, region, city, street }) {
  return (
    <div>
      <p className={styles.text}>Электронная рассылка клиентам, проживающим по адресу:</p>
      <div className={styles.addressWrapper}>
        <input
          required
          type="text"
          name="region"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAddress}`}
          value={region}
          placeholder="Регион"
        />
        <input
          required
          type="text"
          name="city"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAddress}`}
          value={city}
          placeholder="Город"
        />
        <input
          type="text"
          name="street"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAddress}`}
          value={street}
          placeholder="Улица"
        />
      </div>
    </div>
  )
}

Address.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
}

function MailingText({ changeInputHandler, subject, message }) {
  return (
    <div className={styles.mailingTextWrapper}>
      <p className={styles.text}>Текст рассылки:</p>
      <div className={styles.mailingTextInputWrapper}>
        <input
          required
          type="text"
          name="subject"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputText}`}
          value={subject}
          placeholder="Тема письма"
        />
        <textarea
          required
          type="text"
          className={styles.textArea}
          onChange={changeInputHandler}
          name="message"
          value={message}
          placeholder="Текст письма"
        />
      </div>
    </div>
  )
}

MailingText.propTypes = {
  changeInputHandler: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  sendMail: (region, city, street, subject, message, token) =>
    dispatch(sendMailing(region, city, street, subject, message, token)),
})

export default connect(null, mapDispatchToProps)(Mailing)
