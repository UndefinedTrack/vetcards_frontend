import React from 'react'
import { HashLink } from 'react-router-hash-link'
import PropTypes from 'prop-types'
import styles from '../../styles/mainPage/MainPage.module.css'
import SignUp from '../SignUp'
import { ReactComponent as Heart } from '../../icons/emojione-monotone_yellow-heart.svg'
import { ReactComponent as Monitor } from '../../icons/line-md_computer.svg'
import { ReactComponent as Clock } from '../../icons/et_clock.svg'

function ClientPage({ setUserReg }) {
  const hashLink = React.useRef(null)

  function handleButtonClick() {
    if (hashLink.current) {
      hashLink.current.click()
    }
  }

  return (
    <main className={styles.Container}>
      <div className={styles.Advert}>
        <div className={styles.Ad}>
          <div className={styles.SmallText}>Есть домашний любимец?</div>
          <div className={styles.LargeText}>Полезный сервис для здоровья питомца</div>
          <button type="button" className={styles.Button} onClick={handleButtonClick}>
            Зарегистрируйтесь
          </button>
          <HashLink smooth to='#form' ref={hashLink} />
          <div className={styles.SmallText}>Это бесплатно!</div>
        </div>
        <div className={styles.BGColor}>
          <div className={styles.ClientPhoto} />
        </div>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card}>
          <Clock className={styles.icon} />
          <div className={styles.CardText}>Вы не забудете сделать прививку</div>
        </div>
        <div className={styles.Card}>
          <Monitor className={styles.icon} />
          <div className={styles.CardText}>Доступ к истории болезни питомца в личном кабинете</div>
        </div>
        <div className={styles.Card}>
          <Heart className={styles.icon} />
          <div className={styles.CardText}>Создавайте собственные заметки о здоровье питомца</div>
        </div>
      </div>
      <div id='form' className={styles.ConnectPart}>
        <div className={styles.BGClientImage}>
          <SignUp setUserReg={setUserReg} />
        </div>
      </div>
    </main>
  )
}

ClientPage.propTypes = {
  setUserReg: PropTypes.func.isRequired,
}

export default ClientPage
