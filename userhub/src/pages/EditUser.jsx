import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import UserForm from '../components/UserForm';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const items = useStoreState((s) => s.users.items);
  const fetchUsers = useStoreActions((a) => a.users.fetchUsers);
  const editUser = useStoreActions((a) => a.users.editUser);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const user = items.find((u) => u.id === Number(id));

  if (!user) return <p>User not found. <Link to="/users">Back to users</Link></p>;

  const initialValues = {
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    company: user.company?.name ?? '',
    city: user.address?.city ?? '',
  };

  const handleSubmit = async (form) => {
    const updated = {
      ...user, // keep id and any other fields
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: { ...user.company, name: form.company },
      address: { ...user.address, city: form.city },
    };
    const ok = await editUser(updated);
    if (ok) navigate('/users');
  };

  return (
    <>
      <h1>Edit User</h1>
      <UserForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </>
  );
}