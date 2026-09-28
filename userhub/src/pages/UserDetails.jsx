import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const items = useStoreState((s) => s.users.items);
  const fetchUsers = useStoreActions((a) => a.users.fetchUsers);
  const deleteUser = useStoreActions((a) => a.users.deleteUser);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const user = items.find((u) => u.id === Number(id));

  if (!user) return <p>User not found. <Link to="/users">Back to users</Link></p>;

  const handleDelete = async () => {
    if (window.confirm(`Delete ${user.name}?`)) {
      await deleteUser(user.id);
      navigate('/users');
    }
  };

  return (
    <div className="details">
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company?.name ?? '—'}</p>
      <p><strong>City:</strong> {user.address?.city ?? '—'}</p>
      <div className="actions">
        <Link className="btn" to={`/users/edit/${user.id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <Link className="btn" to="/users">Back</Link>
      </div>
    </div>
  );
}