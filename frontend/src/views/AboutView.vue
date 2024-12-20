<template>
  <div class="about">
    <div class="about-container">
      <h1>À propos de notre application de Taskboard</h1>
      
      <p>Bienvenue sur notre application de gestion de tâches collaborative ! 
      Notre plateforme vous permet d’organiser, de suivre et de gérer vos projets 
      de manière simple et efficace.</p>

      <h2>Pourquoi utiliser notre Taskboard ?</h2>
      <p>Dans un monde où la gestion du temps est essentielle, notre outil a été conçu pour vous aider à :</p>
      <ul>
        <li><strong>Planifier vos projets :</strong> Créez des tâches, assignez-les à des membres de votre équipe et définissez des priorités.</li>
        <li><strong>Visualiser votre travail :</strong> Grâce à notre tableau interactif, suivez l'évolution de chaque tâche en temps réel.</li>
        <li><strong>Collaborer facilement :</strong> Travaillez en équipe avec des notifications et des mises à jour en direct.</li>
        <li><strong>Gérer les délais :</strong> Définissez des échéances et recevez des rappels automatiques pour ne rien oublier.</li>
      </ul>

      <h2>Fonctionnalités clés</h2>
      <ul>
        <li> Gestion de tâches</li>
        <li> Tableaux personnalisés pour chaque équipe ou projet</li>
        <li> Interface intuitive </li>
      </ul>

      <p>Nous croyons en une gestion simplifiée des projets pour vous aider à rester concentré 
      sur ce qui compte le plus : <strong>atteindre vos objectifs</strong> !</p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

h2 {
  color: #4CAF50;
  font-size: 1.8rem;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 10px;
}

strong {
  color: #4CAF50;
}

p {
  font-size: 1.1rem;
  color: #333;
  margin-top: 10px;
  line-height: 1.6;
}

ul li::before {
  /* Icone sympas  ma foie */
  content: '✅';  
  margin-right: 10px;
  color: #4CAF50;
}

ul li {
  padding-left: 25px;
}
</style>
