import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createNewSchedule } from '../../actions/schedule'
import styles from '../../styles/vet/CreateSchedule.module.css'

function CreateSchedule() {
  return (
    <div className={styles.ScheduleCreatorContainer}>
      <div className={styles.ScheduleCreatorContent}>
        <form onSubmit={createNewSlots} className={styles.CreateScheduleForm}>
          <div className={styles.FormName}>Рабочие дни</div>
          <DaysOfWeek />
          <div className={styles.FormName}>Часы работы</div>
          <div className={styles.Timing}>
            <TimeBlock />
            <div className={styles.Symbol}>-</div>
            <TimeBlock />
          </div>
          <div className={styles.FormName}>Время обеда</div>
          <div className={styles.Timing}>
            <TimeBlock />
            <div className={styles.Symbol}>-</div>
            <TimeBlock />
          </div>
          <div className={styles.FormName}>Длительность временного слота</div>
          <Duration />
          <button type="submit" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

function createNewSlots({ createSch }) {}

function DaysOfWeek() {
  return (
    <div className={styles.DaysOfWeekContainer}>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        пн
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        вт
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        ср
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        чт
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        пт
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        сб
      </button>
      <button type="button" className={styles.Day} onClick={Click} background-color="black">
        вс
      </button>
    </div>
  )

  function Click(event) {
    const btn = event.target
    if (btn.style.background === 'rgb(225, 244, 169)') {
      btn.style.background = 'rgb(255, 255, 255)'
    } else {
      btn.style.background = 'rgb(225, 244, 169)'
    }
  }
}

function TimeBlock() {
  return (
    <input
      type="text"
      maxLength="5"
      pattern="([0-1]?[1-9]|[0-2][0-3]):([0-5]?[0-9])"
      className={styles.TimeBlock}
      defaultValue="10:00"
    />
  )
}

function Duration() {
  return (
    <div className={styles.mybox}>
      <span className={styles.myarrow} />
      <select className={styles.SelectInput}>
        <option>15 минут</option>
      </select>
    </div>
  )
}

createNewSlots.propTypes = {
  createSch: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  createSch: (vid, slotDate, slotTime) => dispatch(createNewSchedule(vid, slotDate, slotTime)),
})

export default connect(null, mapDispatchToProps)(CreateSchedule)
