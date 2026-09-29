import { createStore, persist } from 'easy-peasy';
import { users } from './userModel';
import { toasts } from './toastModel';
import { theme } from './themeModel';

const store = createStore({
    users: persist(users, { whitelist: ['items'], storage: 'localStorage' }),
    theme: persist(theme, { storage: 'localStorage' }),
    toasts, // not persisted
});

export default store;