import IdmService from './idm.service';

const USER_KEY = 'user';

const AuthService = {
  async login(email, password) {
    const { data } = await IdmService.login({ email, password });
    this.storeUser(data);
    return { ok: true, user: data };
  },

  logout() {
    this.removeUser();
  },

  getUser() {
    return JSON.parse(window.localStorage.getItem(USER_KEY) || null);
  },

  storeUser(user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    window.localStorage.removeItem(USER_KEY);
  },
};

export {
  allowedRole,
};
export default AuthService;
