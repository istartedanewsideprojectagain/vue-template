import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service';

export default {
  namespaced: true,
  state: {
    user: AuthService.getUser(),
    expiration: null,
  },

  getters: {
    isLoggedIn({ user, expiration }) {
      return !!user && !!expiration && (expiration < 0 || expiration * 1000 > new Date().getTime());
    },
  },

  mutations: {
    loginSuccess(state, user) {
      const decodedToken = jwt.decode(user.token);
      const expiration = decodedToken ? decodedToken.exp || -1 : null;

      state.user = user;
      state.expiration = expiration;
    },

    loginFailure(state) {
      state.user = null;
      state.expiration = null;
    },

    clear(state) {
      state.user = null;
      state.expiration = null;
    },
  },

  actions: {
    async load({ commit }) {
      const user = AuthService.getUser();
      if (user) {
        commit('loginSuccess', user);
      } else {
        commit('loginFailure');
      }
    },

    async login({ commit }, { email, password }) {
      return AuthService.login(email, password)
        .then(({ ok, user }) => {
          if (ok && user) {
            commit('loginSuccess', user);
          } else {
            commit('loginFailure');
          }
          return ok;
        }).catch(() => false);
    },

    async logout({ commit }) {
      AuthService.logout();
      commit('clear');
    },
  },
};
