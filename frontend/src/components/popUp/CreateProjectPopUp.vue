<template>
    <div class="popup">
      <div class="popup-content">
        <h2>Créer un projet</h2>
        <form @submit.prevent="createProject">
          <div>
            <label for="name">Nom du projet</label>
            <input v-model="name" type="text" id="name" required />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea v-model="description" id="description" required></textarea>
          </div>
          <div>
            <label for="startDate">Date de début</label>
            <input v-model="startDate" type="date" id="startDate" required />
          </div>
          <div>
            <label for="endDate">Date de fin</label>
            <input v-model="endDate" type="date" id="endDate" required />
          </div>
          <div>
            <label for="status">Statut</label>
            <select v-model="status" id="status" required>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="À venir">À venir</option>
            </select>
        </div>
            <p v-if="authorId">Auteur : {{ authorId}}</p> 
          <button type="submit">Créer le projet</button>
        </form>
        <button @click="closePopup" class="close-btn">Fermer</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
        user: {
            Object,
            required: true
        }
    },
    setup(props) {
      const emit = defineEmits();
      const name = ref('');
      const description = ref('');
      const startDate = ref('');
      const endDate = ref('');
      const status = ref('En cours');
      const authorId = ref(props.user.id);
      const ownerId = ref(props.user.id);

      console.log(ownerId, authorId)
      const createProject = async () => {
        try {
          const response = await axios.post('http://localhost:3000/projects/create', {
            name: name.value,
            description: description.value,
            startDate: startDate.value,
            endDate: endDate.value,
            status: status.value,
            authorId: authorId.value,
            ownerId: ownerId.value,
          });
          console.log('Projet créé avec succès:', response.data);
          alert('Projet créé avec succès !');
          // Fermer la pop-up après la création du projet
          closePopup();
        } catch (error) {
          console.error('Erreur lors de la création du projet:', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      };

      const closePopup = () => {
        emit('close');
      };
  
      return {
        name,
        authorId,
        description,
        startDate,
        endDate,
        status,
        createProject,
        closePopup,
      };
    }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
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
  
  .close-btn {
    margin-top: 10px;
    background-color: #f44336;
  }
  
  .close-btn:hover {
    background-color: #e53935;
  }
  </style>
  