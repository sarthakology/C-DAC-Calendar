import { useState, useContext } from 'react';
import axios from 'axios';
import refreshJWTToken from '../services/RefreshJWTToken';
import GlobalContext from "../context/GlobalContext";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import API_URLS from '../ApiUrls';

export default function LoginPage() {
  const { t } = useTranslation();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eventsFetched, setEventsFetched] = useState(false);
  const [tasksFetched, setTasksFetched] = useState(false);
  const navigate = useNavigate();
  const { dispatchCalEvent, dispatchTask } = useContext(GlobalContext);

  const submitData = async (e) => {
    e.preventDefault();
    localStorage.removeItem('savedEvents');
    localStorage.removeItem('savedTasks');
    dispatchCalEvent({ type: 'deleteAll' });
    dispatchTask({ type: 'deleteAll' });

    try {
      const response = await axios.post(
        API_URLS.LOGIN,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        toast.success('Success! Login successful!!');

        if (!eventsFetched) {
          await fetchAndDispatchEvents();
          setEventsFetched(true);
        }

        if (!tasksFetched) {
          await fetchAndDispatchTasks(); // Fetch tasks after login
          setTasksFetched(true);
        }

        navigate('/');
      } else {
        toast.error('Error! This user does not exist!');
      }
    } catch (error) {
      toast.error('Error occurred while logging in. Please try again.');
      console.error('Login error:', error);
    }
  };

  const fetchAndDispatchEvents = async () => {
    try {
      const accessToken = await refreshJWTToken();

      if (accessToken) {
        const response = await axios.get(API_URLS.GET_USER_EVENTS, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` 
          },
        });
        
        const savedEvents = response.data || [];
        savedEvents.forEach(event => {
          dispatchCalEvent({ type: "push", payload: event });
        });
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  // New function to fetch tasks
  const fetchAndDispatchTasks = async () => {
    try {
      const accessToken = await refreshJWTToken();

      if (accessToken) {
        const response = await axios.get(API_URLS.GET_USER_TASKS, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` 
          },
        });
        
        const savedTasks = response.data || [];
        savedTasks.forEach(task => {
          dispatchTask({ type: "add", payload: task });
        });
      }
    } catch (error) {
      console.error('Error fetching user tasks:', error);
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
              {t("greeting")}
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {t("login")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitData}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{t("yEmail")}</label>
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
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">{t("Password")}</label>
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
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {t("Login")}
              </button>
              <p className="text-sm font-light text-gray-500">
                {t("nAccount")}<Link to="/register" className="font-medium text-primary-600 hover:underline">{t("signuphere")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
