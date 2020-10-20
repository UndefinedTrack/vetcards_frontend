import React from 'react'
import styles from '../../styles/vet/CreateSchedule.module.css'

function CreateSchedule() {
  return (
    <div className={styles.ScheduleCreatorContainer}>
      <div className={styles.ScheduleCreatorContent}>
        <form className={styles.CreateScheduleForm}>
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
          <button type="button" className={styles.saveButton}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

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
  return <input type="text" maxLength="5" className={styles.TimeBlock} defaultValue="10:00" />
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

export default CreateSchedule
