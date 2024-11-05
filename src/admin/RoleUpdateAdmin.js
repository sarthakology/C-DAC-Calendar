import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URLS from '../ApiUrls';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function RoleUpdateAdmin() {
  const { t } = useTranslation();  
  const [users, setUsers] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URLS.GET_ROLE);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (email, newRole) => {
    setUpdatedRoles({
      ...updatedRoles,
      [email]: newRole,
    });
  };

  const handleSubmit = async (email) => {
    const newRole = updatedRoles[email];
    try {
      await axios.put(API_URLS.UPDATE_ROLE, {
        email,
        role: newRole,
      });
      setUsers(users.map((user) =>
        user.email === email ? { ...user, role: newRole } : user
      ));
      toast.success(`Role updated for ${email}`);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role.');
    }
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{t('manageUserRoles')}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">{t('email')}</th>
            <th className="py-2 px-4 border-b">{t('currentRole')}</th>
            <th className="py-2 px-4 border-b">{t('updateRole')}</th>
            <th className="py-2 px-4 border-b">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <select
                  className="border rounded p-2"
                  value={updatedRoles[user.email] || user.role}
                  onChange={(e) => handleRoleChange(user.email, e.target.value)}
                >
                  <option value="admin">{t('admin')}</option>
                  <option value="user">{t('user')}</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleSubmit(user.email)}
                >
                  {t('updateRoleButton')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}