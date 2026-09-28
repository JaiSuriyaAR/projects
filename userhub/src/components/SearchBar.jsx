import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import useDebounce from '../hooks/useDebounce';

export default function SearchBar() {
  const storeTerm = useStoreState((s) => s.users.searchTerm);
  const filterBy = useStoreState((s) => s.users.filterBy);
  const setSearchTerm = useStoreActions((a) => a.users.setSearchTerm);
  const setFilterBy = useStoreActions((a) => a.users.setFilterBy);

  // `input` updates on every keystroke (keeps typing smooth)
  const [input, setInput] = useState(storeTerm);

  // `debounced` only changes after the user stops typing for 400ms
  const debounced = useDebounce(input, 400);

  // Push the debounced value into the Easy Peasy store
  useEffect(() => {
    if (debounced !== storeTerm) setSearchTerm(debounced);
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-bar">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search users..."
      />
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
        <option value="all">All fields</option>
        <option value="name">Name</option>
        <option value="company">Company</option>
        <option value="city">City</option>
      </select>
    </div>
  );
}