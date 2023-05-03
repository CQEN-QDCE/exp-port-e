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
const BASE_URL            = process.env.BASE_URL;
const BASE_SHORT_URL      = process.env.BASE_SHORT_URL;
const ENDPOINT_CONNECTION = process.env.ENDPOINT_CONNECTION;
const X_API_KEY           = process.env.X_API_KEY;
const APP_PORT            = process.env.APP_PORT;

// Configurer axios 
const axios = require("axios");
axios.defaults.baseURL = BASE_URL;
const config = {
  headers:{
    "X-API-KEY": X_API_KEY
  }
};

// Configurer expressjs
const express = require('express')
const app = express();
const port = APP_PORT;

// servir fichier statiques 
app.use('/static', express.static('public'));

// Routing de l'application express 

app.get('/', (req, res) => {
  res.send(' ');
})

app.listen(port, () => {
  console.log(`Application de bootstrap écoute en porte ${port}`);
})

app.get('/getConnection', async (req, res) => {

  let connectionData = await createConnection(); 
  console.log("RETOUR: ", connectionData);

  let shorturl = await registrerShortURL(connectionData);
  console.log(shorturl);

  res.setHeader("Content-Type", "text/plain");
  res.send(shorturl); 
});


/**
 * Crée une nouvelle connexion à l'agent 
 * @returns Le connection_id et l'invitation_url de la connexion.
 */
async function createConnection(){

  axios.defaults.baseURL = BASE_URL;

  try{
      console.log("BASE_URL", BASE_URL); 
      console.log("ENDPOINT_CONNECTION: ", ENDPOINT_CONNECTION);
      const response = await axios.post(`${ENDPOINT_CONNECTION}`,{}, config);
      return {
          "connection_id": response.data.connection_id,
          "invitation_url": response.data.invitation_url 
        }
  } catch (error) {
    if(error.response){ 
        console.log(error.response.statusText);
    } else if(error.request){
        console.log(error.request);
    } else {
        console.log("Erreur inconnu: ", error.message); 
    }
    console.log(error);
  }
}

/**
 * Créé un short url à partir de l'URL de la demande de connexion avec aca-py, et ensuite la codifie 
 * dans le format compatible avec le deeplink pour le portefeuille. L'url qui sera retournée 
 * aura le format suivant:
 *  
 *      didcomm://invite?https://exp-port-e-raccourci.apps.exp.openshift.cqen.ca/US2x19t
 * 
 * @param {*} connectionData 
 * @returns url raccourcie qui pointera à un lien vers l'agent aca-py
 */
async function registrerShortURL(connectionData){

  axios.defaults.baseURL = BASE_SHORT_URL;
  
  // Créé le payload pour l'appel au shortener
  let payload = {
      "originalUrl": connectionData.invitation_url,
      "uniqueId": "", 
      "numberClicks": 0, 
      "user": "port-e-user"
  };

  try{
    const response = await axios.post(`/v1/short-url`, payload, config); 
    let shortUrl = "didcomm://invite?".concat(BASE_SHORT_URL.concat(response.data.uniqueId));
    return shortUrl;
  } catch(error) {
    console.log(error);
  }
}

