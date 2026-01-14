import { useEffect, useState } from 'react';
import { Loader2, Shield, ShieldOff, Trash2, RefreshCw } from 'lucide-react';

type User = {
  uid: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
};

const AdminConfig = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const API_BASE = 'http://localhost:3000';

  // Get fresh token helper
  const getToken = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      console.log('🔑 Fetching with token:', token.substring(0, 20) + '...');

      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', res.status);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Error response:', errorData);
        throw new Error(
          errorData.error || `Failed to fetch users (${res.status})`
        );
      }

      const data = await res.json();
      console.log('✅ Fetched users:', data);
      setUsers(data);
    } catch (err: any) {
      console.error('❌ Fetch error:', err);
      setError(err.message || 'Failed to fetch users');
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
      setActionLoading(uid);
      const token = await getToken();

      console.log('🔼 Promoting user:', uid);

      const res = await fetch(`http://localhost:3000/admin/promote/${uid}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log('📡 Promote response status:', res.status);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Promote error response:', errorData);
        throw new Error(errorData.error || 'Failed to promote user');
      }

      const result = await res.json();
      console.log('✅ Promote result:', result);

      // Wait a bit before refreshing to let Firestore update
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchUsers();
    } catch (err: any) {
      console.error('❌ Promote error:', err);
      alert(err.message || 'Failed to promote user');
    } finally {
      setActionLoading(null);
    }
  };

  // Demote a user
  const demoteUser = async (uid: string) => {
    try {
      setActionLoading(uid);
      const token = await getToken();

      console.log('🔽 Demoting user:', uid);

      const res = await fetch(`${API_BASE}/admin/demote/${uid}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      console.log('📡 Demote response status:', res.status);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Demote error response:', errorData);
        throw new Error(errorData.error || 'Failed to demote user');
      }

      const result = await res.json();
      console.log('✅ Demote result:', result);

      // Wait a bit before refreshing to let Firestore update
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchUsers();
    } catch (err: any) {
      console.error('❌ Demote error:', err);
      alert(err.message || 'Failed to demote user');
    } finally {
      setActionLoading(null);
    }
  };

  // Delete a user
  const deleteUser = async (uid: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user? This action cannot be undone.'
    );
    if (!confirmed) return;

    try {
      setActionLoading(uid);
      const token = await getToken();

      console.log('🗑️ Deleting user:', uid);

      const res = await fetch(`${API_BASE}/admin/delete/${uid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Delete response status:', res.status);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Delete error response:', errorData);
        throw new Error(errorData.error || 'Failed to delete user');
      }

      const result = await res.json();
      console.log('✅ Delete result:', result);

      // Wait a bit before refreshing to let Firestore update
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchUsers();
    } catch (err: any) {
      console.error('❌ Delete error:', err);
      alert(err.message || 'Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users and permissions
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map(user => (
                <tr
                  key={user.uid}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-foreground">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'user' && (
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => promoteUser(user.uid)}
                          disabled={actionLoading === user.uid}
                        >
                          {actionLoading === user.uid ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Shield className="w-4 h-4" />
                          )}
                          Promote
                        </button>
                      )}
                      {user.role === 'admin' && (
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => demoteUser(user.uid)}
                          disabled={actionLoading === user.uid}
                        >
                          {actionLoading === user.uid ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ShieldOff className="w-4 h-4" />
                          )}
                          Demote
                        </button>
                      )}
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => deleteUser(user.uid)}
                        disabled={actionLoading === user.uid}
                      >
                        {actionLoading === user.uid ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No users found
        </div>
      )}
    </div>
  );
};

export default AdminConfig;
