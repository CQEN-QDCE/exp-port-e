/*
* Copyright (c) 2023 Gouvernement du Québec
* Auteur: Julio Cesar Torres (cesju02)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/

const express = require('express'); 
const router  = express.Router(); 

// Configurer dotenv
const dotenv = require('dotenv');
dotenv.config();

// Configurer variables d'environnement
const BASE_URL            = process.env.BASE_URL;
const BASE_SHORT_URL      = process.env.BASE_SHORT_URL;
const ENDPOINT_CONNECTION = process.env.ENDPOINT_CONNECTION;
const ENDPOINT_INVITATION = process.env.ENDPOINT_INVITATION;
const X_API_KEY           = process.env.X_API_KEY;

// Configurer axios 
const axios = require("axios");
axios.defaults.baseURL = BASE_URL;
const config = {
  headers:{
    "X-API-KEY": X_API_KEY, 
    "Content-type": "application/json"
  }
};

/**
 * 
 *    Routing de l'application express
 * 
 */

router.get('/', (req, res) => {
    res.redirect('/index.html');
})

router.get('/connection', async (req, res) => {

    // Créé la connexion
    let connectionData = await createConnection(); 
    console.log("RETOUR: ", connectionData);
    let shorturl = await registrerShortURL(connectionData);
    console.log(shorturl);
    res.setHeader("Content-Type", "text/plain");
    res.send(shorturl);   

    await pooling(connectionData.connection_id);

});
  

/**
 * Crée une nouvelle connexion à l'agent 
 * @returns Le connection_id et l'invitation_url de la connexion.
 */
async function createConnection(){

    axios.defaults.baseURL = BASE_URL;

    try{
        const response = await axios.post(`${ENDPOINT_CONNECTION}`, {}, config);
        console.log(response.data);
        return {
            "connection_id": response.data.connection_id,
            "invitation_url": response.data.invitation_url, 
            "recipient_keys": response.data.invitation.recipientKeys, 
            "service_endpoint": response.data.invitation.serviceEndpoint
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

async function pooling(connectionId){

    console.log("pooling la connection_id : ", connectionId); 
    let i = 0;
 
    const intervalId = setInterval(async () => {
        console.log(i);
        let connStatus = await getConnectionStatus(connectionId);
        console.log(connStatus.data);
        i++;
    }, 10000);

    // Espera por algum tempo antes de cancelar o intervalo (se necessário)
    await new Promise(resolve => setTimeout(resolve, 100000));
    clearInterval(intervalId);

    console.log("Fin du pooling");

}


async function getConnectionStatusy(connectionId){
    console.log(connectionId);
}

async function getConnectionStatus(connectionId){

    axios.defaults.baseURL = BASE_URL;

    try{
        console.log("X-API-KEY: ", config);
        const response= await axios({
            method: 'get',
            url: `${BASE_URL}/connections/${connectionId}`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("error");
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.statusText); 
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

    let didcommAddr = "didcomm://invite".concat(connectionData.invitation_url.substring(connectionData.invitation_url.indexOf('?'))); 
    // Créé le payload pour l'appel au shortener
    let payload = {
        "originalUrl": didcommAddr,
        "uniqueId": "", 
        "numberClicks": 0, 
        "user": "port-e-user"
    };

    try{
        const response = await axios.post(`/v1/short-url`, payload, config); 
        let shortUrl = BASE_SHORT_URL.concat(response.data.uniqueId); 
        return shortUrl;
    } catch(error) {
        console.log(error);
    }
}

module.exports = router;
