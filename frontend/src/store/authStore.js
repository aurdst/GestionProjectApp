// Notre second store pour l'authen youpi hourra blabla :)
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
// Nos etats pour recuperer notre token généré par notre back
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    }
  },
  persist: true // gere l'état entre les rechargements de page (en utilisant localStorage ou sessionStorage)
})