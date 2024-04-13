import React from 'react';

import { TimeNotifier } from './timesEventNotifier.js';

export function Times(props) {

    // const [events, setEvent] = React.useState([]);
    const [availableTimes, setAvailableTimes] = React.useState(null)
    const [selectedDate, setSelectedDate] = React.useState('')
    const [selectedTime, setSelectedTime] = React.useState('')
    //
    React.useEffect(() => {
        TimeNotifier.addHandler(handleTimeEvent);

        return () => {
            TimeNotifier.removeHandler(handleTimeEvent);
        };
    }, []);

    function handleTimeEvent(event) {
        setAvailableTimes(event)
        console.log(event)
    }

    // function defaultDateTime() {
    //     setSelectedDate(availableTimes.days_and_times[0].date)
    //     setSelectedTime(availableTimes.days_and_times[0].times[0])
    // }

    function updateSelectedDate(event) {
        const newDate = event.target.value
        setSelectedDate(newDate)
    }

    function updateSelectedTime(event) {
        const newTime = event.target.value
        setSelectedTime(newTime)
    }

    function createDateSelector() {
        const dateButtonArray = [];
        for (const day of availableTimes.days_and_times) {
            dateButtonArray.push(
                <button key={day.date} className='event' onClick=''>
                    {day.date}
                </button>
            );
        }
        return dateButtonArray;
    }

    function createTimeSelector() {
        const timeContainers = [];
        for (const day of availableTimes.days_and_times) {
            timeContainers.push(
                <div key={day.date} className='event'>
                    {day.times.map(time => {
                        return(
                            <button key={day.date+time} onClick=''>{time}</button>
                        )
                    })}
                </div>
            );
        }
        return timeContainers;
    }

    return (
        <div id='time-selection-row'>
            {availableTimes && (
                <>
                    <button id='date-selector'>{selectedDate}</button>
                    <div id='date-dropdown'>
                        {createDateSelector()}
                    </div>
                    <button id='time-selector'>{selectedTime}</button>
                    <div id='time-dropdown'>
                        {createTimeSelector()}
                    </div>
                </>
                )}
        </div>
    );
}