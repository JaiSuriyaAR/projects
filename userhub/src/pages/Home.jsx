import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

export default function Home() {
  const users = useStoreState((s) => s.users.filteredItems);
  const loading = useStoreState((s) => s.users.loading);
  const error = useStoreState((s) => s.users.error);
  const fetchUsers = useStoreActions((a) => a.users.fetchUsers);
  const resetUsers = useStoreActions((a) => a.users.resetUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <section className="hero">
        <h1>Welcome to UserHub</h1>
        <p>Browse, add, edit and delete users.</p>
        <button className="btn" onClick={resetUsers}>Reset data</button>
      </section>

      <SearchBar />

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}

      <div className="grid">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </>
  );
}