import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cancel if value changes again
  }, [value, delay]);

  return debounced;
}import { action, computed, thunk } from 'easy-peasy';

const API = 'https://jsonplaceholder.typicode.com/users';

// JSONPlaceholder only knows ids 1-10. Locally created users get big ids,
// so we skip the fake API call for them.
const isRemote = (id) => id <= 10;

export const users = {
  // ---------- state ----------
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterBy: 'all', // all | name | company | city
  page: 1,
  pageSize: 5,

  // ---------- computed ----------
  count: computed((state) => state.items.length),

  filteredItems: computed((state) => {
    const term = state.searchTerm.trim().toLowerCase();
    if (!term) return state.items;

    return state.items.filter((u) => {
      const name = u.name?.toLowerCase() ?? '';
      const company = u.company?.name?.toLowerCase() ?? '';
      const city = u.address?.city?.toLowerCase() ?? '';

      switch (state.filterBy) {
        case 'name':
          return name.includes(term);
        case 'company':
          return company.includes(term);
        case 'city':
          return city.includes(term);
        default:
          return [name, company, city].some((f) => f.includes(term));
      }
    });
  }),

  totalPages: computed((state) =>
    Math.max(1, Math.ceil(state.filteredItems.length / state.pageSize))
  ),

  // Clamp so deleting the last item on a page never leaves you on an empty page
  currentPage: computed((state) => Math.min(state.page, state.totalPages)),

  paginatedItems: computed((state) => {
    const start = (state.currentPage - 1) * state.pageSize;
    return state.filteredItems.slice(start, start + state.pageSize);
  }),

  // ---------- actions ----------
  setUsers: action((state, payload) => {
    state.items = payload;
  }),
  addUser: action((state, payload) => {
    state.items.push(payload);
  }),
  updateUser: action((state, payload) => {
    const i = state.items.findIndex((u) => u.id === payload.id);
    if (i !== -1) state.items[i] = payload;
  }),
  removeUser: action((state, id) => {
    state.items = state.items.filter((u) => u.id !== id);
  }),
  setLoading: action((state, v) => {
    state.loading = v;
  }),
  setError: action((state, v) => {
    state.error = v;
  }),
  setSearchTerm: action((state, v) => {
    state.searchTerm = v;
    state.page = 1; // new search starts at page 1
  }),
  setFilterBy: action((state, v) => {
    state.filterBy = v;
    state.page = 1;
  }),
  setPage: action((state, v) => {
    state.page = v;
  }),
  setPageSize: action((state, v) => {
    state.pageSize = Number(v);
    state.page = 1;
  }),

  // ---------- thunks ----------
  fetchUsers: thunk(async (actions, _, { getState }) => {
    // Already loaded (or restored from localStorage): don't overwrite local edits
    if (getState().items.length > 0) return;

    actions.setLoading(true);
    actions.setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('Failed to load users');
      actions.setUsers(await res.json());
    } catch (e) {
      actions.setError(e.message);
    } finally {
      actions.setLoading(false);
    }
  }),

  createUser: thunk(async (actions, user, { getStoreActions }) => {
    const toast = getStoreActions().toasts.show;
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error();
      // The fake API always returns id 11, so generate our own unique id
      actions.addUser({ ...user, id: Date.now() });
      toast({ message: `${user.name} added` });
      return true;
    } catch {
      toast({ message: 'Failed to add user', type: 'error' });
      return false;
    }
  }),

  editUser: thunk(async (actions, user, { getStoreActions }) => {
    const toast = getStoreActions().toasts.show;
    try {
      if (isRemote(user.id)) {
        const res = await fetch(`${API}/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error();
      }
      actions.updateUser(user);
      toast({ message: `${user.name} updated` });
      return true;
    } catch {
      toast({ message: 'Failed to update user', type: 'error' });
      return false;
    }
  }),

  deleteUser: thunk(async (actions, id, { getStoreActions }) => {
    const toast = getStoreActions().toasts.show;
    try {
      if (isRemote(id)) {
        const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error();
      }
      actions.removeUser(id);
      toast({ message: 'User deleted' });
      return true;
    } catch {
      toast({ message: 'Failed to delete user', type: 'error' });
      return false;
    }
  }),

  resetUsers: thunk(async (actions) => {
    actions.setUsers([]);
    await actions.fetchUsers();
  }),
};