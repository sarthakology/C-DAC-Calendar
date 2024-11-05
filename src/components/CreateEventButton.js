import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
import { useTranslation } from "react-i18next";

export default function CreateEventButton() {
  const { t } = useTranslation();
  const { setShowEventModal, showSidebar } = useContext(GlobalContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
        aria-haspopup="true"
        aria-expanded={dropdownVisible}
      >
        <img src={plusImg} alt="create_event" className="w-7 h-7" />
        {showSidebar && (<>
          <span className="pl-3 pr-7">{t("create")}</span>
          <span className="material-icons-outlined">
          arrow_drop_down
          </span>
          </>)}
      </button>

      {/* Dropdown menu */}
      {dropdownVisible && (
        <div
          className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
          role="menu"
        >
          <button
            onClick={() => {
              setShowEventModal(true);
              setDropdownVisible(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            role="menuitem"
          >
            {t("createevent")}
          </button>
          <button
            onClick={() => {
              navigate("/task");
              setDropdownVisible(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            role="menuitem"
          >
            {t("task")}
          </button>
        </div>
      )}
    </div>
  );
}
