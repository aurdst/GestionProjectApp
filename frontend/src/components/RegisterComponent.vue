<template>
    <div class="register-container">
      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Choisissez un nom d'utilisateur"
            required
          />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Choisissez un mot de passe"
            required
          />
        </div>
        <div>
          <label for="confirmPassword">Confirmer le mot de passe</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../store/authStore'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        errorMessage: ''
      }
    },
    setup() {
      const authStore = useAuthStore()
  
      const handleRegister = async () => {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Les mots de passe ne correspondent pas.'
          return
        }
  
        try {
          const response = await axios.post('http://localhost:3000/register', {
            username: this.username,
            password: this.password
          })

          // Si le back est ok alors je met a jour mon store et je set le token retourné
          authStore.setUser(response.data.user)
          authStore.setToken(response.data.token)
  
          // Rediriger vers la page de connexion après l'inscription
          this.$router.push('/login')
        } catch (error) {
          this.errorMessage = 'Une erreur est survenue, réessayez.'
        }
      }
  
      return {
        handleRegister
      }
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  form div {
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
  