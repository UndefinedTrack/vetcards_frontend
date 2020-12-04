import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styles from '../../styles/mainPage/MainPage.module.css'
import ContactForm from './ContactForm'
import { ReactComponent as Book } from '../../icons/bytesize_book.svg'
import { ReactComponent as Settings } from '../../icons/bytesize_settings.svg'
import { ReactComponent as Brush } from '../../icons/tabler_brush.svg'

function MainPage() {
  const hashLink = React.useRef(null)

  function handleButtonClick() {
    if (hashLink.current) {
      hashLink.current.click()
    }
  }

  return (
    <main className={styles.Container}>
      <div className={styles.Advert}>
        <span className={styles.BGColor}>
          <div className={styles.Photo} />
        </span>
        <div className={styles.Ad}>
          <div className={styles.SmallText}>Владеете веткабинетом?</div>
          <div className={styles.LargeText}>Простой и удобный сервис для учёта пациентов</div>
          <button type="button" className={styles.Button} onClick={handleButtonClick}>
            Свяжитесь с нами
          </button>
          <HashLink smooth to="#form" ref={hashLink} />
          <div className={styles.SmallText}>Попробуйте бесплатно!</div>
        </div>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card}>
          <Book className={`${styles.icon} ${styles.firstIcon}`} />
          <div className={styles.MiniCardText}>Доступ к электронным картам</div>
          <div className={styles.MaxiCardText}>Быстрый доступ к электронной медицинской карте пациента</div>
        </div>
        <div className={styles.Card}>
          <Settings className={styles.icon} />
          <div className={styles.CardText}>Настроим сервис под вашу клинику</div>
        </div>
        <div className={styles.Card}>
          <Brush className={styles.icon} />
          <div className={styles.CardText}>Современный дизайн</div>
        </div>
      </div>
      <div id="form" className={styles.ConnectPart}>
        <div className={styles.BGImage}>
          <ContactForm />
        </div>
      </div>
    </main>
  )
}

export default MainPage
