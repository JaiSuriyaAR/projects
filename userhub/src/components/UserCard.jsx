import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className="muted">
        {user.company?.name ?? '—'} · {user.address?.city ?? '—'}
      </p>
      <Link className="btn" to={`/users/${user.id}`}>View</Link>
    </div>
  );
}