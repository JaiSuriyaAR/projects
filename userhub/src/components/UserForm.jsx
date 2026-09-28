import { useState } from 'react';

const empty = { name: '', email: '', phone: '', company: '', city: '' };

export default function UserForm({ initialValues = empty, onSubmit, submitLabel }) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {[
        ['name', 'Name'],
        ['email', 'Email'],
        ['phone', 'Phone'],
        ['company', 'Company'],
        ['city', 'City'],
      ].map(([key, label]) => (
        <label key={key}>
          {label}
          <input name={key} value={form[key]} onChange={handleChange} />
          {errors[key] && <span className="error">{errors[key]}</span>}
        </label>
      ))}
      <button className="btn btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}