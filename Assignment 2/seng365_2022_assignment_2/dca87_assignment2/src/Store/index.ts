import create from 'zustand';
interface UserState {
    user: UserLogin;
    setUser: (user: UserLogin) => void;
    removeUser: (user: UserLogin) => void;
}
const getLocalStorage = (key: string): UserLogin => JSON.parse(window.localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value: UserLogin) =>
    window.localStorage.setItem(key, JSON.stringify(value));
const useStore = create<UserState>((set) => ({
    user: getLocalStorage('user') || {userId: 0, token: ""},
    setUser: (user: UserLogin) => set(() => {
        setLocalStorage('user', user)
        return {user: user}
    }),
    removeUser: () => set(() => {
        setLocalStorage('user', {userId: 0, token: ""})
        return {user : {userId: 0, token: ""}}
    })
}))
export const useUserStore = useStore;