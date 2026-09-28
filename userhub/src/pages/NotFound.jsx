import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="details" style={{ margin: '3rem auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '5rem', margin: 0 }}>404</h1>
      <p>This page doesn't exist.</p>
      <Link className="btn btn-primary" to="/">Go Home</Link>
    </div>
  );
}