import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function DeleteUsersAdmin() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URLS.GET_ROLE);
        setUsers(response.data);
      } catch (error) {
        toast.error(t('fetch Users Error'));
        setError(t('fetchUsersError'));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [t]);
  
  // Delete user account immediately without confirmation
  const handleDelete = async (email) => {
    try {
      await axios.delete(API_URLS.DELETE_USER, {
        data: { email },
      });
      toast.success(t('user Deleted Successfully', { email }));
      setUsers(users.filter(user => user.email !== email)); // Update UI
    } catch (error) {
      toast.error(t('user Delete Error', { email }));
    }
  };
  
  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 border-t-4 border-b-4 border-yellow-500 rounded-full animate-spin animation-delay-300"></div>
    </div>
  </div>
  );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">{t('manageUserDeletion')}</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">{t('email')}</th>
                <th className="py-2 px-4 border-b">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.email)}
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
