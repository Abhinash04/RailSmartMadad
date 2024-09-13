import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth: JSON.parse(localStorage.getItem('auth')) || {
    username: '',
    active: false,
  },
  setAuth: (auth) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    set({ auth });
  },
  setUsername: (name) => set((state) => {
    const updatedAuth = { ...state.auth, username: name };
    localStorage.setItem('auth', JSON.stringify(updatedAuth));
    return { auth: updatedAuth };
  }),
  setActive: (isActive) => set((state) => {
    const updatedAuth = { ...state.auth, active: isActive };
    localStorage.setItem('auth', JSON.stringify(updatedAuth));
    return { auth: updatedAuth };
  }),
  clearAuth: () => {
    localStorage.removeItem('auth');
    set({ auth: { username: '', active: false } });
  }
}));