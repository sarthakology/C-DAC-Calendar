import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from "../context/GlobalContext";
import { toast } from 'react-toastify';
import API_URLS from '../ApiUrls';
import {useTranslation} from "react-i18next";

export default function SearchResultPage() {
  const { t } = useTranslation();
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [checkedEvents, setCheckedEvents] = useState([]); // State for checked events
  const [checkedTasks, setCheckedTasks] = useState([]); // State for checked tasks
  const searchTerm = username;
  const { dispatchCalEvent, dispatchTask } = useContext(GlobalContext);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(searchTerm)) {
      setError('Invalid email format');
      toast.error('Invalid email format');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.SEARCH_USER_PROFILE(searchTerm));
        setData(response.data);
      } catch (error) {
        toast.error('Not found or error occurred');
        setError(error.response ? error.response.data : 'Not found or error occurred');
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleEventChange = (event, index) => {
    if (event.target.checked) {
      setCheckedEvents([...checkedEvents, data.savedEvents[index]]);
    } else {
      setCheckedEvents(checkedEvents.filter((_, i) => i !== index));
    }
  };

  const handleTaskChange = (event, index) => {
    if (event.target.checked) {
      setCheckedTasks([...checkedTasks, data.savedTasks[index]]);
    } else {
      setCheckedTasks(checkedTasks.filter((_, i) => i !== index));
    }
  };

  const handleLogCheckedEvents = () => {
    checkedEvents.forEach((event) => {
      const newEvent = { ...event, id: Date.now() + Math.random() };
      dispatchCalEvent({ type: "push", payload: newEvent });
    });
    
    toast.success('Events added to your Account Successfully!');
  };
  
  const handleLogCheckedTasks = () => {
    checkedTasks.forEach((task) => {
      const newTask = { ...task, id: Date.now() + Math.random() };
      dispatchTask({ type: "add", payload: newTask });
    });
    
    toast.success('Tasks added to your Account Successfully!');
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!data) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("UserDetails")}</h1>
      <div className="mb-6 text-center">
        <img
          src={data.credentials.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 mx-auto"
        />
        <p className="text-xl"><strong>Name:</strong> {data.credentials.name}</p>
        <p className="text-xl"><strong>Email:</strong> {data.credentials.email}</p>
        <p className="text-xl"><strong>Role:</strong> {data.credentials.role}</p>
      </div>


      {data.savedEvents && data.savedEvents.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          {t("SavedEvents")}
          </h2>
          <ul className="list-disc pl-6 space-y-4">
            {data.savedEvents.map((event, index) => (
              <li key={index} className="text-lg flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleEventChange(e, index)}
                  className="mr-2"
                />
                <div>
                  <p><strong>{t("Title")}:</strong> {event.title}</p>
                  <p><strong>{t("Label")}:</strong> {event.label}</p>
                  <p><strong>{t("Day")}:</strong> {new Date(event.day).toDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
              onClick={handleLogCheckedEvents}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {t("Addeventstoyouraccount")}
          </button>
        </div>
      )}

      {data.savedTasks && data.savedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          {t("SavedTasks")}
          </h2>
          <ul className="list-disc pl-6 space-y-4">
            {data.savedTasks.map((task, index) => (
              <li key={index} className="text-lg flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleTaskChange(e, index)}
                  className="mr-2"
                />
                <div>
                  <p><strong>{t("Title")}:</strong> {task.title}</p>
                  <p><strong>{t("Date")}:</strong> {new Date(task.date).toDateString()}</p>
                  <p><strong>{t("StartTime")}:</strong> {task.startTime}</p>
                  <p><strong>{t("End Time")}:</strong> {task.endTime}</p>
                </div>
              </li>
            ))}
          </ul>
            <button
              onClick={handleLogCheckedTasks}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              {t("Addtaskstoyouraccount")}
            </button>
        </div>
      )}
    </div>
  );
}
