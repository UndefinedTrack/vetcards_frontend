import React from 'react'
import styles from '../../styles/mainPage/MainPage.module.css'
import SignUp from '../SignUp'
import { ReactComponent as Heart } from '../../icons/emojione-monotone_yellow-heart.svg'
import { ReactComponent as Monitor } from '../../icons/line-md_computer.svg'

function ClientPage({ setUserReg }) {
  return (
    <main className={styles.Container}>
      <div className={styles.Advert}>
        <div className={styles.Ad}>
          <div className={styles.LargeText}>Полезный сервис для здоровья питомца</div>
          <button type="button" className={styles.Button}>
            Зарегистрируйтесь
          </button>
          <div className={styles.SmallText}>Это бесплатно!</div>
        </div>
        <div className={styles.Photo}>фото</div>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card}>
          <Heart className={styles.icon} />
          <div className={styles.CardText}>Доступ к истории болезни питомца в личном кабинете</div>
        </div>
        <div className={styles.Card}>
          <Monitor className={styles.icon} />
          <div className={styles.CardText}>Доступ к истории болезни питомца в личном кабинете</div>
        </div>
        <div className={styles.Card}>
          <Heart className={styles.icon} />
          <div className={styles.CardText}>Вы не забудете сделать прививку или обработать шерсть любимца от блох</div>
        </div>
      </div>
      <div name="form" className={styles.ConnectPart}>
        <SignUp setUserReg={setUserReg} />
      </div>
    </main>
  )
}

export default ClientPage
