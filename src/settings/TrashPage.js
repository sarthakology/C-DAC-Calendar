import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_URLS from '../ApiUrls';
import refreshJWTToken from '../services/RefreshJWTToken';
import GlobalContext from "../context/GlobalContext";
import { toast } from 'react-toastify'; // Import toast

const TrashedEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const { dispatchCalEvent } = useContext(GlobalContext);

  useEffect(() => {
    const fetchTrashedEvents = async () => {
      const accessToken = await refreshJWTToken();
      if (!accessToken) {
        return;
      } 
      try {
        const response = await axios.get(API_URLS.TRASH, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setEvents(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load trashed events.');
        setIsLoading(false);
        toast.error('Failed to load trashed events.'); // Show toast on error
      }
    };
    fetchTrashedEvents();
  }, []);

  const handleCheckboxChange = (eventId) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(eventId)
        ? prevSelected.filter((id) => id !== eventId)
        : [...prevSelected, eventId]
    );
  };

  const handleDeleteEvents = async () => {
    const accessToken = await refreshJWTToken();
    if (!accessToken) {
      return;
    }
    try {
      for (const eventId of selectedEvents) {
        await axios.put(API_URLS.DELETE_TRASH_EVENT(eventId), {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
      // After deleting, refetch the trashed events
      setSelectedEvents([]);
      const response = await axios.get(API_URLS.TRASH, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setEvents(response.data);
      toast.success('Selected events deleted successfully!'); // Show success toast
    } catch (err) {
      toast.error('Failed to delete events.'); // Show error toast
    }
  };

  const handleRestoreEvents = async () => {
    const selectedEventObjects = selectedEvents.map(eventId => {
      const event = events.find(e => e.id === eventId);
      const { deletedAt, ...rest } = event;
      return rest;
    });

    await handleDeleteEvents(); // Make sure to await this
    selectedEventObjects.forEach(event => {
      dispatchCalEvent({ type: "push", payload: event });
    });
    setSelectedEvents([]); // Clear selected events after dispatch
    toast.success('Selected events restored successfully!'); // Show success toast
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Trashed Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Select</th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Label</th>
              <th className="py-3 px-6 text-left">Deleted At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.id)}
                    onChange={() => handleCheckboxChange(event.id)}
                  />
                </td>
                <td className="py-3 px-6 text-left">{event.id}</td>
                <td className="py-3 px-6 text-left">{event.title}</td>
                <td className="py-3 px-6 text-left">{event.description || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{event.label || 'N/A'}</td>
                <td className="py-3 px-6 text-left">{new Date(event.deletedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleDeleteEvents}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        disabled={selectedEvents.length === 0}
      >
        Delete Selected Events
      </button>

      <button
        onClick={handleRestoreEvents}
        className="mt-6 ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        disabled={selectedEvents.length === 0}
      >
        Restore Selected Events
      </button>
    </div>
  );
};

export default TrashedEvents;
