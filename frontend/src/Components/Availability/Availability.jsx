import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from '../../axios'; // Import Axios
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Availability.module.css'; // Import the CSS module

const Schedule = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allDayDate, setAllDayDate] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(null); // Reset end date if it is before the new start date
    }
  };

  const handleEndDateChange = (date) => {
    // Ensure end date is on the same day as the start date
    if (startDate) {
      const endDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        date.getHours(),
        date.getMinutes()
      );
      setEndDate(endDateTime);
    }
  };

  const handleAllDayDateChange = (date) => {
    setAllDayDate(date);
  };

  const handleCheckboxChange = () => {
    setIsAllDay(!isAllDay);
    if (!isAllDay) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setAllDayDate(null);
    }
  };

  const addAvailabilitySlot = async () => {
    try {
      const userId = '66d93fe471ff55bc09f71910'; // Replace with actual user ID

      if (isAllDay && allDayDate) {
        const response = await axios.post(`/add-availability/${userId}`, {
          allDay: allDayDate.toISOString().split('T')[0] // Send only date part for allDay
        });
        handleResponse(response);
      } else if (startDate && endDate) {
        const response = await axios.post(`/add-availability/${userId}`, {
          start: startDate.toISOString(),
          end: endDate.toISOString()
        });
        handleResponse(response);
      } else {
        alert('Please select either both start and end dates or an all-day date.');
      }
    } catch (error) {
      console.error('Error adding availability:', error);
      alert('Error adding availability');
    }
  };

  const handleResponse = (response) => {
    if (response.data.userNotExist) {
      alert(response.data.userNotExist);
    } else if (response.data.errorDate) {
      alert(response.data.errorDate);
    } else if (response.data.success) {
      alert(response.data.message);
    } else {
      alert(response.data);
    }
    console.log(response.data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Schedule Your Availability</h2>

      {isAllDay ? (
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Date for All Day: </label>
          <DatePicker
            selected={allDayDate}
            onChange={handleAllDayDateChange}
            dateFormat="dd/MM/yyyy"
            className={styles.datePicker}
            placeholderText="Select date"
            minDate={new Date()}
          />
        </div>
      ) : (
        <>
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Start Date and Time: </label>
            <DatePicker 
              selected={startDate} 
              onChange={handleStartDateChange} 
              showTimeSelect
              timeIntervals={30}
              dateFormat="dd/MM/yyyy hh:mm aa"
              className={styles.datePicker}
              placeholderText="Select start date and time"
              minDate={new Date()}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Select End Date and Time: </label>
            <DatePicker 
              selected={endDate} 
              onChange={handleEndDateChange} 
              showTimeSelect
              timeIntervals={30}
              dateFormat="dd/MM/yyyy hh:mm aa"
              className={styles.datePicker}
              placeholderText="Select end time"
              minDate={startDate}
              minTime={startDate ? startDate : new Date()} // Minimum time is start time
              maxTime={startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 23, 59) : null} // Max time is end of day
              timeCaption="Time"
            />
          </div>
        </>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <input 
            type="checkbox" 
            checked={isAllDay} 
            onChange={handleCheckboxChange} 
          />
          Available All Day
        </label>
      </div>

      <button className={styles.addButton} onClick={addAvailabilitySlot}>Add Availability</button>
    </div>
  );
};

export default Schedule;
