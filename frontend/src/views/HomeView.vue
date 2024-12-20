<template>
  <div id="app">
    <h1 v-if="authStore.user">Bienvenue, {{ authStore.user.username }}!</h1>
    <h1 v-else>
      <i class="fa fa-user"></i>
      Connecte-toi pour continuer !
    </h1>
    <login-component>
    </login-component>
    
  </div>
</template>

<script>
import { useAuthStore } from '../store/authStore'
import LoginComponent from '../components/LoginComponent.vue'

export default {
  components: { LoginComponent },
  setup() {
    const authStore = useAuthStore()

    // Utiliser authStore pour accéder à l'état global de notre user 
    return { authStore }
  }
}
</script>

<style>
i {
  margin-left: 10px;
  font-size: 48px !important;
  color: #4caf50;
}
</style>