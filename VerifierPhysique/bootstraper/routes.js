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

    // Créé la demande de preuve /proof-request/send-request
    let proofRequestData = await createProofRequest(connectionData);
    //console.log(proofRequestData.data); 
    console.log("PROOF_REQUEST: ", proofRequestData); 

    // Génère le short url avec la sortie de la generation de la demande de preuve.
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

/**
 * Créé une nouvelle proof-request, et execute l'endpoint send-request
 * @param {*} connectionData 
 * @returns 
 */
async function createProofRequest(connectionData){

    axios.defaults.baseURL = BASE_URL;

    let body  =
        {
            "connection_id" : "5261334c-d814-4b33-b3ef-bd4e5bdcf72c",
            "trace" : "true", 
            "comment" : "Faire preuve d'attestation d'identite IQN'", 
            "proof_request" : {
                "name"    : "Preuve identite IQN", 
                "version" : "1.0", 
                "requested_attributes" : {
                    "email": {
                        "name": "email",
                        "restrictions": [
                            {
                                "cred_def_id": "FUKLxsjrYSHgScLbHuPTo4:3:CL:29366:RegistreAccesVirtuelCQEN-0.1.2-flihp"
                            }
                        ]
                    }
                }, 
                "requested_predicates" : {}
            }
        };

    try{
        console.log("================================================");
        console.log("Coucou requete...");
        console.log("================================================");
        const response = await axios.post(`${ENDPOINT_INVITATION}`, body, config);
        return response;
    } catch(error){
        console.log("Erreur survenu de l'application..."); 
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

    let didcommAddr = "didcomm://invite".concat(connectionData.invitation_url.substring(connectionData.invitation_url.indexOf('?'))); 
    // Créé le payload pour l'appel au shortener
    let payload = {
        //"originalUrl": connectionData.invitation_url,
        "originalUrl": didcommAddr,
        "uniqueId": "", 
        "numberClicks": 0, 
        "user": "port-e-user"
    };

    try{
        const response = await axios.post(`/v1/short-url`, payload, config); 
        //let shortUrl = "didcomm://invite".concat(BASE_SHORT_URL.concat(response.data.uniqueId));
        let shortUrl = BASE_SHORT_URL.concat(response.data.uniqueId); 
        return shortUrl;
    } catch(error) {
        console.log(error);
    }
}

module.exports = router;
