import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import useProfile from '../profileDataBackend/ProfileData';
import { useNavigate } from 'react-router-dom';
import refreshJWTToken from '../services/RefreshJWTToken';
import GlobalContext from "../context/GlobalContext";
import { uploadFileToFirebase } from "../firebase/FirebaseUpload";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";
import API_URLS from '../ApiUrls';

const ProfilePage = () => {
  const { t } = useTranslation();
  const profileData = useProfile();
  
  const profile = useMemo(() => profileData || {
    email: "Error",
    gender: "Error",
    role: "Error",
    name: "Error",
    phno: 0,
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    accountStatus: "Public"  // Default to 'Public'
  }, [profileData]);

  const [name, setName] = useState(profile.name);
  const [gender, setGender] = useState(profile.gender);
  const [role, setRole] = useState(profile.role);
  const [phno, setPhno] = useState(profile.phno);
  const [email, setEmail] = useState(profile.email);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [imageUpload, setImageUpload] = useState(null);
  const [imgURL, setImgURL] = useState(profile.profilePicture);
  const [accountStatus, setAccountStatus] = useState(profile.accountStatus); // New field

  const { setLoader, dispatchCalEvent, dispatchTask } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    setName(profile.name);
    setGender(profile.gender);
    setRole(profile.role);
    setPhno(profile.phno);
    setEmail(profile.email);
    setProfilePicture(profile.profilePicture);
    setImgURL(profile.profilePicture);
    setAccountStatus(profile.accountStatus); // Initialize the account status
  }, [profile]);

  const handleSaveChanges = async () => {
    setLoader(true);
    try {
      let uploadedImageURL = imgURL;

      // Upload the image if a new one is selected
      if (imageUpload) {
        await uploadFileToFirebase(imageUpload, (url) => {
          uploadedImageURL = url;
        }, setLoader);
      }

      const accessToken = await refreshJWTToken(navigate);
      if (accessToken) {
        const formData = {
          name,
          gender,
          phno,
          email,
          profilePicture: uploadedImageURL, // Use the URL of the uploaded image
          accountStatus, // Include account status in the payload
        };
        await axios.put(API_URLS.UPDATE_USER_PROFILE, formData, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        console.log('Profile updated successfully');
        toast.success('Success! Profile updated successfully!');
      } else {
        console.error('No accessToken found');
        toast.error('No accessToken found');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile:', error);
    } finally {
      setIsEditing(false);
      setLoader(false);
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('savedEvents');
      localStorage.removeItem('savedTasks');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast.success('Successfully logged out!');
      dispatchCalEvent({ type: 'deleteAll' });
      dispatchTask({ type: 'deleteAll' });
      navigate('/');
  };

  if (!profileData) return     
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
  <div className="relative w-16 h-16">
    <div className="absolute inset-0 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    <div className="absolute inset-0 border-t-4 border-b-4 border-yellow-500 rounded-full animate-spin animation-delay-300"></div>
  </div>
</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="relative flex justify-center mb-4">
          {isEditing ? (
            <>
              <img
                src={imageUpload ? URL.createObjectURL(imageUpload) : profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300 cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setImageUpload(file);
                    setImgURL(URL.createObjectURL(file)); // Update the image preview
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          ) : (
            <img
              src={imageUpload ? URL.createObjectURL(imageUpload) : profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          )}
        </div>

        <div className="space-y-4">
          {/* Name input */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("name")}:</span>
            {isEditing ? (
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className="mt-1 text-gray-900">{name || "N/A"}</p>
            )}
          </div>

          {/* Gender input */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("gender")}:</span>
            {isEditing ? (
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">{t("SelectGender")}</option>
                <option value="Male">{t("Male")}</option>
                <option value="Female">{t("Female")}</option>
                <option value="Other">{t("Other")}</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900">{gender || "N/A"}</p>
            )}
          </div>

          {/* Role display (cannot change) */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("role")}:</span>
            <p className="mt-1 text-gray-900">{role || "N/A"}</p>
          </div>

          {/* Phone number input */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("phoneNumber")}:</span>
            {isEditing ? (
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={phno}
                onChange={(e) => setPhno(e.target.value)}
              />
            ) : (
              <p className="mt-1 text-gray-900">{phno || "N/A"}</p>
            )}
          </div>

          {/* Email input */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("email")}:</span>
            {isEditing ? (
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="mt-1 text-gray-900">{email || "N/A"}</p>
            )}
          </div>

          {/* Account Status input */}
          <div>
            <span className="block text-sm font-medium text-gray-700">{t("AccountStatus")}:</span>
            {isEditing ? (
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={accountStatus}
                onChange={(e) => setAccountStatus(e.target.value)}
              >
                <option value="Private">{t("Private")}</option>
                <option value="Public">{t("Public")}</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900">{accountStatus || "N/A"}</p>
            )}
          </div>

          <button 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          >
            {isEditing ? t("saveChanges") : t("editProfile")}
          </button>

          <button 
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            onClick={handleLogout}
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
