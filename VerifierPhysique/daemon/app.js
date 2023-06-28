/*
* Copyright (c) 2023 Gouvernement du Québec
* Auteur: Julio Cesar Torres (cesju02)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
// Configurer dotenv
const dotenv = require('dotenv');
dotenv.config();

// Configurer variables d'environnement
const APP_PORT = process.env.APP_PORT;

// Configurer expressjs
const express = require('express')
const app = express();
const port = APP_PORT;

// Monter les routes 
const routes = require('./routes'); 
app.use(routes); 

// servir fichier statiques 
//app.use('/static', express.static('public'));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Application de bootstrap écoute en porte ${port}`);
});