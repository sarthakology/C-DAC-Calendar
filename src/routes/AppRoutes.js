import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal";
import EventsPage from "../components/EventsPage";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import UpdatesPage from "../SupportPages/UpdatesPage";
import MainSettingsPage from "../settings/MainSettingsPage";
import TrashPage from "../settings/TrashPage";
import GetAddonsPage from "../settings/GetAddonsPage";
import RegisterPage from "../registerPage/RegisterPage";
import LoginPage from "../loginPage/LoginPage";
import ProfilePage from "../components/ProfilePage";
import Loader from "../components/Loader";
import Admin from "../admin/Admin";
import CalendarScreenSaver from "../components/CalendarScreenSaver";
import TasksManager from "../components/TaskManager";
import SearchResultPage from "../components/SearchResultPage";

const AppRoutes = () => {
  const { monthIndex, showEventModal, calendarEventToggle, loader, setLoader } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      const handleStorageChange = () => {
        setAccessToken(localStorage.getItem("accessToken"));
      };
      window.addEventListener("storage", handleStorageChange);
      const checkTokenInterval = setInterval(handleStorageChange, 500);
      setLoader(false);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(checkTokenInterval);
      };
    }, 1000);
  }, [setLoader]);

  return (
    <Router>
      {/* Show Loader if loader state is true */}
      {loader && <Loader />}

      <Routes>
        {/* Register/Login routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Profile route with conditional redirect */}
        <Route 
          path="/profile" 
          element={
            <>
              <CalendarHeader />
              {accessToken ? <ProfilePage /> : <Navigate to="/login" />}
            </>
          } 
        />

        {/* Home/Calendar Route */}
        <Route
          path="/"
          element={
            <>
              {showEventModal && <EventModal />}
              <div className="h-screen flex flex-col">
                <CalendarHeader />
                {calendarEventToggle ? (
                  <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} />
                  </div>
                ) : (
                  <EventsPage />
                )}
              </div>
            </>
          }
        />

        {/* Admin */}
        <Route path="/admin" element={<><CalendarHeader /><Admin/> </>} />
        {/* Support Pages */}
        <Route path="/updates" element={<><CalendarHeader /><UpdatesPage /></>} />

        {/* Settings Pages */}
        <Route path="/setting" element={<><CalendarHeader /><MainSettingsPage /></>} />
        <Route path="/trash" element={<><CalendarHeader /><TrashPage /></>} />
        <Route path="/Get-add-ons" element={<><CalendarHeader /><GetAddonsPage /></>} />

        <Route path="/screensaver" element={<CalendarScreenSaver/>} />

        <Route path="/task" element={<><CalendarHeader /><TasksManager/></>} />

        <Route path="/search/:username" element={<><CalendarHeader /><SearchResultPage /></>} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <h1 className="text-6xl font-extrabold mb-4 animate-pulse">404</h1>
              <p className="text-2xl font-semibold mb-4">Oops! Page Not Found</p>
              <p className="text-lg text-center max-w-md mb-6">
                It seems the page you’re looking for doesn’t exist. It may have been moved or deleted.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-700 hover:text-white transition duration-300"
              >
                Go Back Home
              </button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
