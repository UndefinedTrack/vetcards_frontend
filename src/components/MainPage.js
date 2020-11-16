import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/mainPage/MainPage.module.css'

function MainPage() {
  return (
    <div className={styles.MainPageContainer}>
      <div className={styles.WelcomeText}>
        <p className={styles.Text}>
          Вы открыли демо-версию сервиса VetCards. В данный момент сервис находится на начальной стадии разработки,
          поэтому многие функции могут не работать или работать неправильно. Просим сообщать о возникающих проблемах в
          нашу группу ВКонтакте:{' '}
          <a href="https://vk.com/undefined_vetcards" className={styles.Link}>
            https://vk.com/undefined_vetcards/
          </a>
          .
        </p>
        <p className={styles.Text}>
          Также вы можете поделиться с нами любыми впечатлениями о сервисе. Удобно ли он устроен? Может быть, что-то
          вызывает сложности? Вместе мы сделаем этот сервис лучше, поэтому очень надеемся на вашу обратную связь!
        </p>
        <p className={styles.Text}>
          Наш сервис состоит из двух разделов: первый раздел для ведения истории болезни, плановых осмотров и др.,
          заполняемый ветеринаром, а второй - для владельцев животных, которым предоставлена возможность вести записи о
          здоровье питомца и самостоятельно проведенных процедурах. На данный момент регистрации на сервисе нет, поэтому
          вы можете попробовать оба режима.
        </p>
        <p className={`${styles.Warning} ${styles.Text}`}>
          Просим обратить внимание, что данные, которые вы отправите на сервис станут общедоступными. Все пользователи
          используют один аккаунт, будьте внимательны и не отправляйте свои личные данные!
        </p>
        <div className={styles.ButtonsContainer}>
          <Link to="./mypets">
            <div className={styles.Button}>Режим владельца</div>
          </Link>
          <Link to="./mypatients">
            <div className={styles.Button}>Режим ветеринара</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage
