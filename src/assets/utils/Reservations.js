let eventGuid = 0

export const INITIAL_EVENTS = [
  /*{
    id: createEventId(),
    title: 'CE1101 - INTRODUCCIÓN A LA PROGRAMACIÓN',
    start: '2021-11-01' + 'T07:30:00',
    end: '2021-11-01' + 'T09:20:00',
  },
  {
    id: createEventId(),
    title: 'CE1102 - TALLER DE PROGRAMACIÓN',
    start: '2021-11-01' + 'T09:30:00',
    end: '2021-11-01' + 'T11:20:00'
  }*/
]

export function createEventId() {
  return String(eventGuid++)
}

function jsonConcat(o1, o2) {
  for (var key in o2) {
      o1[key] = o2[key];
  }
  return o1;
}

const setScheduleSection = (date, time) => {
  let end = date + 'T' + time.substr(6) + ':00';
  let start = date + 'T' + time.substr(0,5) + ':00';
  return({start: start, end: end})
}

export const setReservationsLimits = (reservations) => {
  let data = [];
  for(let i=0; i < reservations.length; i++){
    let date = setScheduleSection(reservations[i].date, reservations[i].scheduleSection)
    let event = jsonConcat(date, {id: reservations[i].reservationId, title: reservations[i].description, description: reservations[i].manager})
    data.push(event);
  }
  //console.log(data);
  return(data);
}