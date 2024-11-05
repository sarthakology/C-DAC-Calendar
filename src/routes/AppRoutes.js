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
import DensityAndColorPage from "../settings/DensityAndColorPage";
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
    // Show loader when accessing the token
    setLoader(true); // Start loader before token is fetched

    // Simulate async token fetch
    setTimeout(() => {
      const handleStorageChange = () => {
        setAccessToken(localStorage.getItem("accessToken"));
      };

      // Listen for changes to localStorage
      window.addEventListener("storage", handleStorageChange);

      // Also check periodically for changes
      const checkTokenInterval = setInterval(handleStorageChange, 500);

      // Hide loader after the token is fetched or checked
      setLoader(false);

      // Cleanup event listener and interval on component unmount
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(checkTokenInterval);
      };
    }, 1000); // Simulate delay (e.g., API call delay or token validation)
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
        <Route path="/DensityAndColor" element={<><CalendarHeader /><DensityAndColorPage /></>} />
        <Route path="/Get-add-ons" element={<><CalendarHeader /><GetAddonsPage /></>} />

        <Route path="/screensaver" element={<CalendarScreenSaver/>} />

        <Route path="/task" element={<><CalendarHeader /><TasksManager/></>} />

        <Route path="/search/:username" element={<><CalendarHeader /><SearchResultPage /></>} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
