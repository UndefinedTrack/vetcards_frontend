/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/pet/Diary.module.css'
import { getNotifications } from '../../actions/notifications'
import HomeProcedure from './HomeProcedure'
import { ReactComponent as Plus } from '../../icons/plus.svg'

// eslint-disable-next-line
function Reminders({ uid, name, plusClick, notifList, getNotifications }) {
  const { pid } = useParams()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!notifList.length) {
      getNotifications(pid, uid, token)
    }

    setTimeout(() => getNotifications(pid, uid, token), 100)
    // eslint-disable-next-line
  }, [pid])

  return (
    <section className={styles.DiaryBlocks}>
      <div className={styles.NameAndSearch}>
        <div className={styles.Name}>{name}</div>
        <div className={styles.Buttons}>
          <Plus className={styles.Button} onClick={plusClick} />
        </div>
      </div>
      <hr className={styles.Line} />
      <section className={styles.Procedures}>
        {!notifList.length && (
          <div className={styles.EmptyStoryContainer}>
            <div className={styles.EmptyStory}>Нет ни одного напоминания</div>
          </div>
        )}
        {notifList
          .map((proc) => {
            const day = proc.date.slice(8, 10)
            const month = Number(proc.date.slice(5, 7)) - 1
            const year = proc.date.slice(0, 4)
            const date = new Date(year, month, day)
            return <HomeProcedure key={proc.notifId} proc={proc} date={date} />
          })
          .reverse()
          .sort((a, b) => {
            return b.props.date - a.props.date
          })}
      </section>
    </section>
  )
}

Reminders.defaultProps = {
  plusClick: () => {},
}

Reminders.propTypes = {
  uid: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  plusClick: PropTypes.func,
  getNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  notifList: state.notification.notifications,
})

const mapDispatchToProps = (dispatch) => ({
  getNotifications: (pid, uid, token) => dispatch(getNotifications(pid, uid, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reminders)
