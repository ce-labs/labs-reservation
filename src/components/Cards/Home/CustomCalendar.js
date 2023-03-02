import React, { createRef, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Home/calendar/app-styles.css";
import Modal from "react-modal";
import { customStyles } from "constants/styles";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export default function CustomCalendar({ reservations, blockades }) {
  const [events, setEvents] = useState([]);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState([]);

  const openDescriptionModal = () => {
    setDescriptionModal(true);
  };

  const closeDescriptionModal = () => {
    setDescriptionModal(false);
  };

  let calDateTimeFormatting = {
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, "dddd", culture),
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "h a", culture),
  };

  useEffect(() => {
    loadEvents();
  }, [reservations]);

  const loadEvents = async () => {
    if (reservations || blockades) {
      const eventsReservations = reservations.map((ev) =>
        reformatEventData(ev)
      );
      const eventsBlockades = blockades.map((ev) => reformatEventData(ev));
      let events = eventsReservations.concat(eventsBlockades);
      setEvents(events);
    }
  };

  const reformatEventData = (event) => {
    let startDate = moment("11012015", "MMDDYYYY")
      .add(event.dayOfWeek, "days")
      .format("YYYY-MM-DD");
    //let colorData = event.colorType;
    //let bgColor = colorData ? colorData.color : "#4286f4";
    let bgColor = event.colorType ? event.colorType : "#7A7485";
    const updatedEvent = {
      ...event,
      start: new Date(`${startDate} ${event.startTime}`),
      end: new Date(`${startDate} ${event.endTime}`),
      bgColor,
    };
    return updatedEvent;
  };

  const setEventCellStyling = (event) => {
    let color = event.bgColor;
    let style = {
      background: `rgba(${parseInt(color.substring(1, 3), 16)}, ${parseInt(
        color.substring(3, 5),
        16
      )}, ${parseInt(color.substring(5, 7), 16)}, 0.99)`,
    };
    return { style };
  };

  const onCalendarEventSelection = (event) => {
    //console.log(event);
    setCurrentEvent(event);
    openDescriptionModal();
  };

  return (
    <div className="container-fluid">
      <DragAndDropCalendar
        localizer={localizer}
        //selectable="ignoreEvents"
        events={events}
        defaultDate={new Date(2015, 10, 1, 0)}
        defaultView={"week"}
        views={["week"]}
        step={15}
        timeslots={4}
        toolbar={false}
        min={moment().hours(5).minutes(0).toDate()}
        formats={calDateTimeFormatting}
        //onEventDrop={this.onEventMoveResize}
        //onEventResize={this.onEventMoveResize}
        eventPropGetter={setEventCellStyling}
        onSelectEvent={onCalendarEventSelection}
        //onSelectSlot={this.calendarSelectionHandler}
      />
      <Modal
        isOpen={descriptionModal}
        onRequestClose={closeDescriptionModal}
        style={customStyles}
      >
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center ">
            <h1 className="text-blueGray-700 text-xl font-bold">
            {currentEvent.title}
            </h1>
          </div>
          <h6 className="text-blueGray-700 text-sm font-bold">
            Encargado: {currentEvent.manager}
          </h6>
          <h6 className="text-blueGray-700 text-sm font-bold">
            Horario: {currentEvent.startTime} - {currentEvent.endTime}
          </h6>
        </div>
      </div>
      </Modal>
    </div>
  );
}
