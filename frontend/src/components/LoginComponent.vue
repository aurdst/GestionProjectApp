<template>
    <div class="login-container">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store/authStore'
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const authStore = useAuthStore()
      const router = useRouter() 

      const username = ref('')
      const password = ref('')
      const errorMessage = ref('')
  
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            username: username.value,
            password: password.value
          })
          
          // Si 200 alors Enregistrer le token et les infos de l'utilisateur dans Pinia
          if (response.status === 200) {
            authStore.setUser(response.data.user)
            authStore.setToken(response.data.token)
            // Rediriger vers la page d'accueil ou tableau de bord
            router.push('/')
          }
  
        } catch (error) {
          console.log(error)
          errorMessage.value = 'Nom d\'utilisateur ou mot de passe incorrect.'
        }
      }
  
      return {
        username,
        password,
        errorMessage,
        handleLogin
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f5F5F5;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  form div {
    margin-bottom: 10px;
  }
  input {
    width: 80%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #fff;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 5px;
    font-size: 16px;
  }
  button:hover {
    background-color: #45a049;
  }
  .error {
    color: red;
    text-align: center;
  }
  </style>
  