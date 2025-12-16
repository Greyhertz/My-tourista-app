import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  uid: string;
  name: string;
  email: string;
  role: string;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('authToken'); // the Firebase token

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Promote a user
  const promoteUser = async (uid: string) => {
    try {
      await axios.put(
        `http://localhost:3000/admin/promote/${uid}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Demote a user
  const demoteUser = async (uid: string) => {
    try {
      await axios.put(
        `http://localhost:3000/admin/demote/${uid}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a user
  const deleteUser = async (uid: string) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.uid} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2 space-x-2">
                {user.role === 'user' && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => promoteUser(user.uid)}
                  >
                    Promote
                  </button>
                )}
                {user.role === 'admin' && (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => demoteUser(user.uid)}
                  >
                    Demote
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(user.uid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
