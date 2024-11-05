import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs"; // Ensure dayjs is imported for date formatting

export default function EventsPage() {
  const { t } = useTranslation();
  const { savedEvents, savedTasks } = useContext(GlobalContext);

  // Helper function to dynamically set the color of the label
  const getLabelColorClass = (label) => {
    const labelColors = {
      indigo: "bg-indigo-500 text-white",
      gray: "bg-gray-500 text-white",
      green: "bg-green-500 text-white",
      blue: "bg-blue-500 text-white",
      red: "bg-red-500 text-white",
      purple: "bg-purple-500 text-white",
    };
    return labelColors[label] || "bg-gray-300 text-white"; // Default color if label doesn't match
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-5">
{savedTasks.length > 0 ? (
      <h1 className="text-4xl font-bold text-gray-800 mb-10">{t("Tasks")}</h1>
    ) :<></>}
      {/* Display Tasks Section */}
      <div className="w-full max-w-4xl mb-10">

        {savedTasks.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">{t("title")}</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">{t("date")}</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">{t("time")}</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">{t("description")}</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">{t("reminder")}</th>
              </tr>
            </thead>
            <tbody>
              {savedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                    {dayjs(task.date).format('MMMM D, YYYY')}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                    {task.duration === "all-day" 
                      ? "12:00 AM - 12:00 PM (All Day)" 
                      : `${task.startTime} - ${task.endTime}`}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-500">
                    {task.reminder === "No" ? "No Reminder" : `At ${task.reminder}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>

      {savedEvents.length > 0 ? (
      <h1 className="text-4xl font-bold text-gray-800 mb-10">{t("events")}</h1>
    ) : (<></>)}

      {savedEvents.length > 0 ? (
        <div className="w-full max-w-4xl">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
                  {t("title")}
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
                  {t("description")}
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
                  {t("label")}
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
                  {t("day")}
                </th>
              </tr>
            </thead>
            <tbody>
              {savedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                    {event.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLabelColorClass(event.label)}`}>
                      {event.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-gray-500">
                    {new Date(event.day).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      
    </div>
  );
}
