import { NavLink } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const count = useStoreState((s) => s.users.count);

  return (
    <nav className="navbar">
      <h2 className="brand">UserHub</h2>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/users" end>
          Users <span className="badge">{count}</span>
        </NavLink>
        <NavLink to="/users/add">Add User</NavLink>
      </div>
      <ThemeToggle />
    </nav>
  );
}