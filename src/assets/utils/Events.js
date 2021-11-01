let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:30:00'
  },
  {
    id: createEventId(),
    title: 'adasdsadas event',
    start: todayStr + 'T15:30:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}