import React from 'react'
import styles from '../../styles/mainPage/MainPage.module.css'
import ContactForm from './ContactForm'
import { ReactComponent as Book } from '../../icons/bytesize_book.svg'
import { ReactComponent as Settings } from '../../icons/bytesize_settings.svg'

function MainPage() {
  return (
    <main className={styles.Container}>
      <div className={styles.Advert}>
        <div className={styles.Photo}>фото</div>
        <div className={styles.Ad}>
          <div className={styles.LargeText}>Простой и удобный сервис для учёта пациентов</div>
          <button type="button" className={styles.Button}>
            Свяжитесь с нами
          </button>
          <div className={styles.SmallText}>Попробуйте бесплатно!</div>
        </div>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card}>
          <Book className={styles.icon} />
          <div className={styles.CardText}>Быстрый доступ к электронной медицинской карте пациента</div>
        </div>
        <div className={styles.Card}>
          <Settings className={styles.icon} />
          <div className={styles.CardText}>Настроим сервис под вашу клинику</div>
        </div>
        <div className={styles.Card}>
          <Book className={styles.icon} />
          <div className={styles.CardText}>Быстрый доступ к электронной медицинской карте пациента</div>
        </div>
      </div>
      <div name="form" className={styles.ConnectPart}>
        <ContactForm />
      </div>
    </main>
  )
}

export default MainPage
