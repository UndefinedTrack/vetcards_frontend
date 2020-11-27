import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../../styles/vet/Mailing.module.css'
import { sendMailing } from '../../actions/mailing'


function Mailing ({ sendMail }) {
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
    sendMail(
      state.region,
      state.city,
      state.adress,
      state.subject,
      state.message,
      token,
    )
    setState({
      region: '',
      city: '',
      street: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className={styles.mailingSpace} >
      <div className={styles.mailingWrapper} >
        <form className={styles.form} onSubmit={submitHandler}>
          <Adress changeInputHandler={changeInputHandler} />
          <MailingText />
          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}

Mailing.propTypes ={
  sendMail: PropTypes.func.isRequired,
}

function Adress({ changeInputHandler }) {
  return(
    <div>
      <p className={styles.text}>Электронная рассылка клиентам, проживающим по адресу:</p>
      <div className={styles.adressWrapper}>
        <input 
          type="text"
          name="region"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAdress}`}
          defaultValue=""
          placeholder="Регион"
        />
        <input 
          type="text"
          name="city"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAdress}`}
          defaultValue=""
          placeholder="Город"
        />
        <input
          type="text"
          name="street"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputAdress}`}
          defaultValue=""
          placeholder="Улица"
        />
      </div>
    </div>
  )
}

Adress.propTypes ={
  changeInputHandler: PropTypes.func.isRequired,
}

function MailingText({ changeInputHandler }) {
  return (
    <div className={styles.mailingTextWrapper}>
      <p className={styles.text}>Текст рассылки:</p>
      <div className={styles.mailingTextInputWrapper}>
        <input
          type="text"
          name="subject"
          onChange={changeInputHandler}
          className={`${styles.input} ${styles.inputText}`}
          defaultValue=""
          placeholder="Тема письма"
        />
        <textarea
          type="text"
          className={styles.textArea}
          onChange={changeInputHandler}
          name="mailingText"
          defaultValue=""
          placeholder="Текст письма"
        />
      </div>
    </div>
  )
}

MailingText.propTypes ={
  changeInputHandler: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  sendMail: (region, city, street, subject, message, token) => dispatch(sendMailing(region, city, street, subject, message, token))
})

export default connect(null, mapDispatchToProps)(Mailing)
