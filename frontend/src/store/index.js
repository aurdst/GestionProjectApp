// On créer notre premier store ! 
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // Nos etats de données
  state: () => ({
    user: null
  }),
  // Ici nos methode 
  actions: {
    setUser(user) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  }
})
