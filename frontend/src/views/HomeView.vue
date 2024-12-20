<template>
  <div id="app">
    <div v-if="authStore.user">
      <h1 >Bienvenue, {{ authStore.user.username }}!</h1>
      <h3>
        Consulté mon tableau => 
        <router-link to="/taskboard">Mon Taskboard</router-link>
      </h3>
    </div>
    <div v-else>
      <h1>
        <i class="fa fa-user"></i>
        Connecte-toi pour continuer !
      </h1>
      <login-component>
      </login-component>
    </div>
    
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