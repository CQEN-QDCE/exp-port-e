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
const HOST_PORTE_URL      = process.env.HOST_TUNNEL; 
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

/**
 * Endpoint racine. Retourne page d'accueil.
 */
router.get('/', (req, res) => {
    res.redirect('/index.html');
})

/**
 * Endpoint pour créér nouvelle connexion et demande de preuve. 
 */
router.get('/connection', async (req, res) => {

    // Créé l'invitation à la connexion
    let connectionData = await createConnection(); 

    // Créé le short url de l'invitation de la connexion et 
    // l'envoie au consommateur physique
    let shorturl = await registrerShortURL(connectionData);
    console.log("[/connection] Invitation à connexion: ", shorturl);
    res.setHeader("Content-Type", "text/plain");
    res.send(shorturl);   

    // Réealise le pooling de l'établissement de la connexion
    await poolingConnection(connectionData.connection_id);

});
  

/**
 * ==============================
 *   
 *    Methodes d'affaire 
 * 
 * ==============================
 */


/**
 * Crée une nouvelle connexion à l'agent 
 * @returns Le connection_id et l'invitation_url de la connexion.
 */
async function createConnection(){

    console.log("[createConnection] Creation d'une nouvelle connexion");
    axios.defaults.baseURL = BASE_URL;

    try{
        console.log(`[createConnection] GET ${BASE_URL}/connections/create-invitation HTTP/1.1`);
        const response = await axios.post(`${ENDPOINT_CONNECTION}`, {}, config);
        console.log("[createConnection] connection_id: ", response.data.connection_id);
        return {
            "connection_id": response.data.connection_id,
            "invitation_url": response.data.invitation_url, 
            "recipient_keys": response.data.invitation.recipientKeys, 
            "service_endpoint": response.data.invitation.serviceEndpoint
            }
    } catch (error) {
        console.log("[createConnection] Erreur"); 
        if(error.response){
            console.log("[createConnection] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[createConnection] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[createConnection] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }
}

/**
 * Faire le pooling de la connexion qui a été envoyée au client. Une fois que le 
 * status change de invitation à response, faire appel à l'envoi de la demande de preuve. 
 * @param {*} connectionId 
 */
async function poolingConnection(connectionId){

    console.log("[poolingConnection] connection_id: ", connectionId); 

    let i = 0;

    const connIntervalId = setInterval(async () => {
        let connStatus = await getConnectionStatus(connectionId);
        console.log(`[poolingConnection] connectionId: ${connectionId}, connStatus.state: (${connStatus.state}), iteration: [${i}]`);

        if (connStatus.state == 'response' || connStatus.state == 'active') {
            console.log(`[poolingConnection] ===>>> Connexion ${connectionId} acceptee.`);
            console.log("[poolingProofRequest] INTERVAL CLEARED!!!!!!=============>>>>>>>> CONNINTERVALID: ");
            clearInterval(connIntervalId);
            await sendProofRequest(connectionId);
            console.log(`[poolingConnection] connectionId: ${connectionId}, Fin du pooling d'établisement de connexion`);
        }
        i++;
    }, 10000);
    
}

/**
 * Recupère le status de la connexion. 
 * @param {*} connectionId 
 * @returns 
 */
async function getConnectionStatus(connectionId){

    axios.defaults.baseURL = BASE_URL;

    try{
        console.log(`[getConnectionStatus] GET ${BASE_URL}/connections/${connectionId} HTTP/1.1`);
        const response= await axios({
            method: 'get',
            url: `${BASE_URL}/connections/${connectionId}`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        return response.data;
    } catch (error) {
        console.log("[getConnectionStatus] Erreur"); 
        if(error.response){
            console.log("[getConnectionStatus] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[getConnectionStatus] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[getConnectionStatus] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }
}


/**
 * Envoie à l'utilisateur une demande de preuve, puis commence à faire du pooling 
 * en attente de la réponse présentée. 
 * @param {*} connectionId 
 * @returns 
 */
async function sendProofRequest(connectionId){

    console.log(`[sendProofRequest] connection_id: ${connectionId}`)
    axios.defaults.baseURL = BASE_URL;

    let body  =
        {
            "connection_id" : connectionId,
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
                                // "cred_def_id": "FUKLxsjrYSHgScLbHuPTo4:3:CL:29366:RegistreAccesVirtuelCQEN-0.1.2-flihp"
                                "schema_name": "CQENDroitAccesVirtuel", 
                                "issuer_did": "FUKLxsjrYSHgScLbHuPTo4"
                            }
                        ]
                    }
                }, 
                "requested_predicates" : {}
            }
        };

    try{
        console.log(`[sendProofRequest] POST ${BASE_URL}/${ENDPOINT_INVITATION} HTTP/1.1`);
        const response = await axios.post(`${ENDPOINT_INVITATION}`, body, config);
        console.log("[sendProofRequest] Demande de preuve envoyee")
        console.log("[sendProofRequest] PROOF-REQUEST: ", response.data);
        //console.log("PRES EX ID: ", response.data.presentation_exchange_id);
        await poolingProofRequest(response.data.presentation_exchange_id, connectionId); 

    } catch(error){
        console.log("[sendProofRequest] Erreur de generation de la proof-request..."); 
        if(error.response){
            console.log("[sendProofRequest] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[sendProofRequest] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[sendProofRequest] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }
}

/**
 * Faire e pooling de la présentation de la preuve. 
 * @param {*} presentationExchangeId 
 * @param {*} connectionId 
 */
async function poolingProofRequest(presentationExchangeId, connectionId){

    let i = 0;
    const proofIntervalId = setInterval(async () => {
        console.log(`[poolingProofRequest] PROOF_REQUEST: connection_id: ", ${connectionId}, presentationExchangeId[${presentationExchangeId}], iteration: [${i}]` );
        let proofStatus = await getProofRequestStatus(presentationExchangeId);

        if (proofStatus.state == 'presentation_received' || proofStatus.state == 'verified'){    
            console.log(`[poolingProofRequest] demande de preuve présentee par l'usager`)
            console.log("[poolingProofRequest] INTERVAL CLEARED!!!!!!=============>>>>>>>> PROOFINTERVALID: ");
            clearInterval(proofIntervalId);
            console.log(`[poolingProofRequest] connectionId: ${connectionId}, Fin du pooling de proof-request`);
        }
        i++;
    }, 10000);
}

/**
 * 
 * @param {*} presentationExchangeId 
 * @returns 
 */
async function getProofRequestStatus(presentationExchangeId){

    axios.defaults.baseURL = BASE_URL;

    try{
        console.log(`[getProofPresentationStatus] GET ${BASE_URL}/present-proof/records/${presentationExchangeId} HTTP/1.1`)
        const proofStatus = await axios({
            method: 'get',
            url: `${BASE_URL}/present-proof/records/${presentationExchangeId}`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        if(proofStatus.data.state == 'presentation_received'){   
            recupereDonneesProof(presentationExchangeId);
        } /*else {
            console.log(proofStatus.data);
        }*/
        //console.log(proofStatus.data);
        return proofStatus.data;
    } catch (error) {
        console.log("[getProofRequestStatus] Erreur"); 
        if(error.response){
            console.log("[getProofRequestStatus] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[getProofRequestStatus] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[getProofRequestStatus] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }

}

/**
 * 
 * @param {*} presentationExchangeId 
 */
async function recupereDonneesProof(presentationExchangeId){

    console.log("[recupereDonneesProof] ")
    axios.defaults.baseURL = BASE_URL;

    try{
        console.log(`[recuperaDonneesProof] GET ${BASE_URL}/present-proof/records/${presentationExchangeId}/verify-presentation`)
        const proofData = await axios({
            method: 'post',
            url: `${BASE_URL}/present-proof/records/${presentationExchangeId}/verify-presentation`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        
        let emailPreuve = proofData.data.presentation.requested_proof.revealed_attrs.email.raw;
        console.log("[recupereDonneesProof] DONNEES DE LA PREUVE: ");
        console.log("[recupereDonneesProof] ", emailPreuve);
        
        /*if(emailPreuve != null){
            acces();
        } else {
            refus();
        }*/

        if(emailPreuve == 'juliozohar@gmail.com'){
            refus();
        } else {
            acces();
        }
        
    } catch (error) {
        console.log("[recupereDonneesProof] Erreur"); 
        if(error.response){
            console.log("[recupereDonneesProof] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[recupereDonneesProof] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[recupereDonneesProof] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }
}


async function acces(){
    
    axios.defaults.baseURL = HOST_PORTE_URL;

    try{
        const accesRes = await axios({
            method: 'get',
            url: `${HOST_PORTE_URL}/acces`,
            headers: {
                'Content-Type': 'text/plain' 
            }
        });
    }catch(error){
        console.log("error access"); 
        console.log(error.code); 
        console.log(error.config.url); 
        console.log(error.response.status);
        console.log(error.response.statusText); 
        console.log(error.response.data);
    }
    
}

async function refus(){

    axios.defaults.baseURL = HOST_PORTE_URL;

    const accesRes = await axios({
        method: 'get',
        url: `${HOST_PORTE_URL}/refus`,
        headers: {
            'Content-Type': 'text/plain' 
        }
    });
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
        console.log(`[registerShortUrl] POST ${BASE_SHORT_URL}//v1/short-url`)
        const response = await axios.post(`/v1/short-url`, payload, config); 
        //let shortUrl = "didcomm://invite".concat(BASE_SHORT_URL.concat(response.data.uniqueId));
        let shortUrl = BASE_SHORT_URL.concat(response.data.uniqueId); 
        return shortUrl;
    } catch(error) {
        console.log("[registrerShortURL] Erreur"); 
        if(error.response){
            console.log("[registrerShortURL] Erreur response: "); 
            console.log(error.response.statusText);
        } else if(error.request){
            console.log("[registrerShortURL] Erreur request: ");
            console.log(error.request);
        } else {
            console.log("[registrerShortURL] Erreur inconnu: ");
            console.log(error.message); 
        }
        console.log(error);
    }
}

module.exports = router;
