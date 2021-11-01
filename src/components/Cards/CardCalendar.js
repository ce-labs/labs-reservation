import React, { useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../../assets/utils/Events';


export default function CardCalendar() {

    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    
    const renderSidebar = () => {
        return(
            <>
                <div className='demo-app-sidebar'>
                    <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                    </div>
                    <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                        type='checkbox'
                        checked={weekendsVisible}
                        onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                    </div>
                    <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                    </div>
                </div>
            </>
        )
    }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
        {/*this.setState({
          weekendsVisible: !this.state.weekendsVisible
        })*/}
      }

    function renderSidebarEvent (event) {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
    }

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
    }

    const handleEventClick = (clickInfo) => {
        {/*if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }*/}
      }

    const handleEvents = (events) => {
        setCurrentEvents(events);
      }

    function renderEventContent(eventInfo) {
        return (
          <>
            <b>{eventInfo.timeText}</b> - 
            <i>{eventInfo.event.title}</i>
          </>
        )
      }

    return(
        <>
            <div className='demo-app'>
                {renderSidebar}
                <div className='demo-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                    }}
                    initialView='timeGridWeek'
                    editable={true}
                    selectable={false}
                    selectMirror={false}
                    dayMaxEvents={false}
                    weekends={weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} 
                />
                </div>
            </div>
        </>
    )


}
