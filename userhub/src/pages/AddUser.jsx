import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import UserForm from '../components/UserForm';

export default function AddUser() {
  const navigate = useNavigate();
  const createUser = useStoreActions((a) => a.users.createUser);

  const handleSubmit = async (form) => {
    const user = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: { name: form.company },
      address: { city: form.city },
    };
    const ok = await createUser(user);
    if (ok) navigate('/users');
  };

  return (
    <>
      <h1>Add User</h1>
      <UserForm onSubmit={handleSubmit} submitLabel="Add User" />
    </>
  );
}