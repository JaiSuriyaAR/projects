import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function UserList() {
  const users = useStoreState((s) => s.users.paginatedItems);
  const loading = useStoreState((s) => s.users.loading);
  const fetchUsers = useStoreActions((a) => a.users.fetchUsers);
  const deleteUser = useStoreActions((a) => a.users.deleteUser);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (user) => {
    if (window.confirm(`Delete ${user.name}?`)) deleteUser(user.id);
  };

  return (
    <>
      <h1>Users</h1>
      <SearchBar />
      {loading && <Loader />}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loading && (
              <tr><td colSpan="5">No users match your search.</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                <td>{u.email}</td>
                <td>{u.company?.name ?? '—'}</td>
                <td>{u.address?.city ?? '—'}</td>
                <td className="actions">
                  <Link className="btn" to={`/users/edit/${u.id}`}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(u)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
}