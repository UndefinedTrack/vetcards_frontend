import React from 'react'
import styles from '../../styles/mainPage/MainPage.module.css'
import { ReactComponent as VK } from '../../icons/VK.svg'
import { ReactComponent as Mail } from '../../icons/ant-design_mail-outlined.svg'

function Contacts() {
  return (
    <div className={styles.ContactsContainer}>
      <div className={styles.ContactsText}>
        Мы - команда <span className={styles.Green}>Undefined</span> - студенты совместной программы МФТИ и Mail.ru
        Group, которая называется Технотрек. “VetCards” - электронные медицинские карты питомцев - наш выпускной проект.
      </div>
      <div className={styles.ContactsText}>
        Хотите с нами сотрудничать? Нашли баг? Хотите оставить отзыв или высказать предложение по развитию сервиса?
      </div>
      <div className={styles.ContactsText}>Свяжитесь с нами!</div>
      <div className={styles.Block}>
        <Mail className={styles.Cursor} />
        <div className={styles.Social}>
          undefined.track<span className={styles.Green}>@</span>gmail.com
        </div>
      </div>
      <div className={styles.Block}>
        <a href="https://vk.com/undefined_vetcards" rel="noopener noreferrer" target="_blank">
          <VK className={styles.Cursor} />
        </a>
        <div className={styles.Social}>vk.com/undefined_vetcards</div>
      </div>
    </div>
  )
}

export default Contacts
