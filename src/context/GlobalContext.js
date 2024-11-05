import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
  showSidebar: true,
  setShowSidebar: () => {},
  calendarEventToggle: true,
  setCalendarEventToggle: () => {},
  loader: false,
  setLoader: () => {},
  savedTasks: [],
  dispatchTask: () => {},
});

export default GlobalContext;
