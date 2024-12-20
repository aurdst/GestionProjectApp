<template>
    <div class="taskboard">
      <h1>Bienvenue, {{ authStore.user.username }}!</h1>
      <span class="badge">{{ authStore.user.role }}</span>
  
      <div class="board">
        <div v-for="day in days" :key="day" class="day-column">
          <h2>{{ day }}</h2>
          <div v-if="loading" class="loading">Chargement...</div>
          <div v-else>
            <div v-if="groupedProjects[day]?.length">
              <div v-for="project in groupedProjects[day]" :key="project.projectId" class="project-card">
                <h3>{{ project.name }}</h3>
                <p>{{ project.description }}</p>
                <small>Période: {{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}</small>
              </div>
            </div>
            <p v-else class="empty">Aucun projet</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { useAuthStore } from '../store/authStore'
  import axios from 'axios'
  
  export default {
    setup() {
      const authStore = useAuthStore()
      const projects = ref([])
      const loading = ref(true)
  
      const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  
      // Récupérer tous les projets
      // Par soucis de temps et comme le projet n'est pas grand je n'utilise pas de store project pour le moment 
      const fetchProjects = async () => {
        try {
          const response = await axios.get('http://localhost:3000/projects/getAll')
          projects.value = response.data
        } catch (error) {
          console.error('Erreur lors de la récupération des projets', error)
        } finally {
          loading.value = false
        }
      }
  
      // Grouper les projets par jour de début
      const groupedProjects = computed(() => {
        return days.reduce((acc, day) => {
          acc[day] = projects.value.filter(project => {
            const startDay = new Date(project.startDate).toLocaleDateString('fr-FR', { weekday: 'long' })
            return startDay.toLowerCase() === day.toLowerCase()
          })
          return acc
        }, {})
      })
  
      // Formatter la date
      const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')
  
      onMounted(fetchProjects)
  
      return {
        authStore,
        days,
        groupedProjects,
        loading,
        formatDate
      }
    }
  }
  </script>
  
  <style scoped>
  .taskboard {
    padding: 20px;
    background: #f8f9fa;
  }
  
  h1 {
    text-align: center;
  }
  
  .badge {
    display: inline-block;
    background: #4caf50;
    color: white;
    padding: 5px 10px;
    margin-bottom: 20px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .board {
    display: flex;
    justify-content: space-between;
  }
  
  .day-column {
    width: 13%;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .day-column h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .project-card {
    background: #e3f2fd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .loading,
  .empty {
    text-align: center;
    color: #777;
  }
  </style>
  