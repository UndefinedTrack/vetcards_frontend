import React from 'react'
import styles from '../../styles/SignUp.module.css'

function ContactForm() {
  return (
    <main>
      <form className={styles.ContactForm}>
        <div className={styles.FormName} id="contact-form">
          Мы вам напишем!
        </div>
        <div className={styles.Text}>Как к вам обращаться?</div>
        <div className={styles.Block}>
          <input
            required
            name="last_name"
            placeholder="Фамилия"
            maxLength="30"
            title="Фамилия может содержать только буквы и должна быть длиннее 2 символов"
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            className={styles.FormInput}
            // onChange={changeInputHandler}
          />
          <input
            required
            name="first_name"
            placeholder="Имя"
            maxLength="30"
            title="Имя может содержать только буквы и должно быть длиннее 2 символов"
            pattern="[A-Za-zА-Яа-яЁё]{2,30}"
            className={styles.FormInput}
            // onChange={changeInputHandler}
          />
        </div>
        <div className={styles.Text}>Куда придёт наше электронное письмо?</div>
        <div className={styles.Block}>
          <input
            type="email"
            required
            name="email"
            placeholder="Электронная почта"
            className={styles.FormInput}
            // onChange={changeInputHandler}
          />
        </div>
        <div className={styles.Warning}>Все поля обязательны для заполнения</div>
        {/* <div className={styles.WrongMessage}>{wrong}</div> */}
        <button type="submit" id="submit" className={styles.SubmitButton}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>
    </main>
  )
}

export default ContactForm
