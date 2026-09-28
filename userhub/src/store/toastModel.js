import { action, thunk } from 'easy-peasy';

export const toasts = {
  list: [],

  push: action((state, toast) => {
    state.list.push(toast);
  }),
  remove: action((state, id) => {
    state.list = state.list.filter((t) => t.id !== id);
  }),

  show: thunk((actions, { message, type = 'success' }) => {
    const id = Date.now() + Math.random();
    actions.push({ id, message, type });
    setTimeout(() => actions.remove(id), 3000);
  }),
};