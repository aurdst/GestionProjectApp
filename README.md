# GestionProjectApp


# BACKEND
Pour gérer les utilisateur ainsi que les différentes fonctionnalités j'ai choisi MySQL avec le pannel fournis par XAMP.

Installer XAMP, activé Apache et Mysql enfin rendez-vous sur phpMyAdmin 

# ETAPE 1
### Voici le script basique de création de notre BDD pour les utilisateur dans un premier temps

CREATE DATABASE project_vuejs_managementPro;

USE project_vuejs_managementPro;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('developper', 'manager') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Ajouter un utilisateur a la bdd fraicheùent créer

INSERT INTO users (username, password, role)
VALUES ('admin', MD5('admin'), 'manager');