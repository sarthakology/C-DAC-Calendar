import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import DeleteEvent from "../services/DeleteEvent";
import { useTranslation } from "react-i18next";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { t } = useTranslation();
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
  
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState(
      selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    );
    const [guestEmails, setGuestEmails] = useState(
      selectedEvent ? selectedEvent.guests?.map((guest) => guest.email) || [""] : [""]
    );
  
    function handleGuestChange(index, value) {
      const updatedGuests = [...guestEmails];
      updatedGuests[index] = value;
      setGuestEmails(updatedGuests);
    }
  
    function addGuestField() {
      setGuestEmails([...guestEmails, ""]);
    }
  
    function removeGuestField(index) {
      setGuestEmails(guestEmails.filter((_, i) => i !== index));
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
        guests: guestEmails
          .filter((email) => email !== "")
          .map((email) => ({ email })),  // Save in correct format for backend
      };
  
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }
      console.log(calendarEvent)
      setShowEventModal(false);
    }
  
    function handelDelete() {
      DeleteEvent(selectedEvent.id);
      dispatchCalEvent({ type: "delete", payload: selectedEvent });
      setShowEventModal(false);
    }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={handelDelete}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder={t("addtitle")}
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder={t("addadescription")}
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
            {/* Guest Emails Section */}
            <span className="material-icons-outlined text-gray-400">person_add</span>
            <div className="space-y-2">
              {guestEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <input
                    type="email"
                    placeholder={t("addguestemail")}
                    value={email}
                    onChange={(e) => handleGuestChange(index, e.target.value)}
                    className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeGuestField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addGuestField}
                className="text-blue-500 hover:text-blue-700"
              >
                {t("addguest")}
              </button>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            {t("save")}
          </button>
        </footer>
      </form>
    </div>
  );
}