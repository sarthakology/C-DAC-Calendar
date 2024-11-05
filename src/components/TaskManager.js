import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { toast } from 'react-toastify';
import DeleteTask from "../services/DeleteTask";
import {useTranslation} from "react-i18next";

const TasksManager = () => {
  const { t } = useTranslation();
  const { savedTasks, dispatchTask } = useContext(GlobalContext);
  const [taskInput, setTaskInput] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("08:00"); // Default start time
  const [taskEndTime, setTaskEndTime] = useState("09:00"); // Default end time
  const [isAllDay, setIsAllDay] = useState(false); // Checkbox for All Day
  const [taskDescription, setTaskDescription] = useState(" ");
  const [reminder, setReminder] = useState(false); // Checkbox for Reminder Yes/No
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false); // Toggle for showing the form

  // Helper function to set times for all-day tasks
  const handleAllDayToggle = () => {
    setIsAllDay(!isAllDay);
    if (!isAllDay) {
      setTaskStartTime("00:00"); // 12:00 AM
      setTaskEndTime("12:00"); // 12:00 PM
    }
  };

  const handleAddTask = () => {
    if (taskInput.trim() && taskDate && taskDescription) {
      dispatchTask({
        type: "add",
        payload: {
          id: Date.now(),
          title: taskInput,
          date: taskDate,
          startTime: isAllDay ? "12:00 AM" : taskStartTime,
          endTime: isAllDay ? "12:00 PM" : taskEndTime,
          duration: isAllDay ? "all-day" : "timed",
          description: taskDescription,
          reminder: reminder ? taskStartTime : "No", // Save reminder as event start time or "No"
          completed: false,
        },
      });
      resetForm();
    }
    toast.success('Task Added Successfully!');
  };
  
  const handleUpdateTask = () => {
    if (editingTask && taskInput.trim() && taskDate && taskDescription) {
      dispatchTask({
        type: "update",
        payload: {
          ...editingTask,
          title: taskInput,
          date: taskDate,
          startTime: isAllDay ? "12:00 AM" : taskStartTime,
          endTime: isAllDay ? "12:00 PM" : taskEndTime,
          duration: isAllDay ? "all-day" : "timed",
          description: taskDescription,
          reminder: reminder ? taskStartTime : "No", // Save updated reminder
        },
      });
      resetForm();
    }
    toast.success('Task Updated Successfully!');
  };

  const resetForm = () => {
    setTaskInput("");
    setTaskDate("");
    setTaskStartTime("08:00");
    setTaskEndTime("09:00");
    setIsAllDay(false);
    setTaskDescription("");
    setReminder(false);
    setEditingTask(null);
    setShowTaskForm(false); // Hide form after reset
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskInput(task.title);
    setTaskDate(task.date);
    setTaskStartTime(task.startTime === "12:00 AM" ? "08:00" : task.startTime); // Reset to default if "All Day"
    setTaskEndTime(task.endTime === "12:00 PM" ? "09:00" : task.endTime); // Reset to default if "All Day"
    setIsAllDay(task.duration === "all-day");
    setTaskDescription(task.description);
    setReminder(task.reminder !== "No"); // Set reminder checkbox based on saved value
    setShowTaskForm(true); // Show form when editing
  };

  const handleDeleteTask = (id) => {
    dispatchTask({ type: "delete", payload: { id } });
    DeleteTask(id)
    toast.success('Task Deleted Successfully!');
  };


  return (
    <div className="flex flex-col items-center">
      {/* Top - Create Task Button */}
      <div className="w-full p-4 bg-gray-100 mb-4">
        <button
          onClick={() => setShowTaskForm(true)}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {t("CreateTask")}
        </button>
      </div>

      {/* Bottom - Task List */}
      <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{t("TaskManager")}</h2>

        <ul className="space-y-2">
          {savedTasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-50 shadow rounded-lg p-4 border border-gray-300 transition hover:shadow-md">
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{dayjs(task.date).format('MMMM D, YYYY')}</p>
                <p className="text-gray-700">
                  {task.duration === "all-day" 
                    ? "12:00 AM - 12:00 PM (All Day)" 
                    : `${task.startTime} - ${task.endTime}`}
                </p>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-gray-500">
                {t("Reminder")}: {task.reminder === "No" ? "No Reminder" : `At ${task.reminder}`}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEditTask(task)}
                  className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
                >
                  {t("Edit")}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  {t("Delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>



      {/* Task Form - Toggle Display */}
      {showTaskForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4 text-center">{editingTask ? "Edit Task" : "Create Task"}</h3>

            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Task Title..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={handleAllDayToggle}
                className="mr-2"
              />
              <label className="text-gray-700">{t("AllDay")}</label>
            </div>

            {!isAllDay && (
              <>
                <div className="flex items-center mb-2">
                  <label className="mr-2 text-gray-700">{t("Start Time")}</label>
                  <input
                    type="time"
                    value={taskStartTime}
                    onChange={(e) => setTaskStartTime(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex items-center mb-2">
                  <label className="mr-2 text-gray-700">{t("EndTime")}</label>
                  <input
                    type="time"
                    value={taskEndTime}
                    onChange={(e) => setTaskEndTime(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </>
            )}

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={reminder}
                onChange={() => setReminder(!reminder)}
                className="mr-2"
              />
              <label className="text-gray-700">{t("SetReminder")}</label>
            </div>

            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <div className="flex justify-end">
              <button
                onClick={() => setShowTaskForm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 mr-2"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksManager;
