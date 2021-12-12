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
  return(data);
}