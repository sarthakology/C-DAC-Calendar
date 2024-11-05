import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URLS from '../ApiUrls';

export default function RegisterPage() {
  const {t} = useTranslation();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const formData ={
        email: email,
        password: password
      };

      axios.post(API_URLS.REGISTER, formData)
      .then(response => {
        toast.success('Success! You are Registered');
        navigate('/login');
      })
      .catch(error => {
        toast.error('Error Registering User:', error);
      });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img className="mr-2" src="https://www.cdac.in/img/cdac-logo.png" alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {t("createanaccount")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{t("youremail")}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">{t("password")}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">{t("confirmpassword")}</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                  {t("iacceptthe")}<Link to="https://cdac.in/index.aspx?id=terms_conditions" className="font-medium text-primary-600 hover:underline">{t("termsandConditions")}</Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isChecked}
                style={{ opacity: isChecked ? 1 : 0.5 }}
              >
                {t("createanaccount")}
              </button>
              <p className="text-sm font-light text-gray-500">
              {t("alreadyhaveanaccount")}<Link to="/login" className="font-medium text-primary-600 hover:underline">{t("loginhere")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
