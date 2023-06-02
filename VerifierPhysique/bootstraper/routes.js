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

/**
 * Endpoint créé nouvelle connexion et demande de preuve. 
 */
router.get('/connection', async (req, res) => {

    // Créé la connexion
    let connectionData = await createConnection(); 
    //console.log("RETOUR: ", connectionData);

    //res.setHeader("Content-Type", "application/json");
    let shorturl = await registrerShortURL(connectionData);
    console.log(shorturl);
    res.setHeader("Content-Type", "text/plain");
    res.send(shorturl);   

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

    axios.defaults.baseURL = BASE_URL;

    try{
        const response = await axios.post(`${ENDPOINT_CONNECTION}`, {}, config);
        //console.log(response.data);
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
 * Faire le pooling de la connexion qui a été envoyée au client. Une fois que le 
 * @param {*} connectionId 
 */
async function poolingConnection(connectionId){

    console.log("Pooling la connection_id : ", connectionId); 

    let i = 0;

    const connIntervalId = setInterval(async () => {
        console.log(i);
        let connStatus = await getConnectionStatus(connectionId);
        //console.log(connStatus.state);

        if (connStatus.state == 'response'){
            clearInterval(connIntervalId);
            await sendProofRequest(connectionId);
        }
        i++;
    }, 10000);

    // Espera por algum tempo antes de cancelar o intervalo (se necessário)
    // await new Promise(resolve => setTimeout(resolve, 30000000));

    // clearInterval(intervalId);

/*
    let connectionStatus = setTimeout(getConnectionStatus, 10000, connectionId);
    await console.log(connectionStatus.data);
    if(connectionStatus.data.state != "invitation"){
        pooling(connectionId);
    }
*/
    console.log("Fin du pooling");
    //console.log(await getConnectionStatus(connectionId));

}

/**
 * 
 * @param {*} connectionId 
 * @returns 
 */
async function getConnectionStatus(connectionId){

    axios.defaults.baseURL = BASE_URL;

    try{
        const response= await axios({
            method: 'get',
            url: `${BASE_URL}/connections/${connectionId}`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        //console.log(response.data);
        
        
        // const response = await axios.get(`/connections/${connectionId}`, {}, `X-API-KEY": ${X_API_KEY}`);
        //console.log(response.data);
        /*return {
            "connection_id": response.data.connection_id,
            "invitation_url": response.data.invitation_url, 
            "recipient_keys": response.data.invitation.recipientKeys, 
            "service_endpoint": response.data.invitation.serviceEndpoint
        } */
        return response.data;
    } catch (error) {
        console.log("error");
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.statusText); 
        if(error.response){ 
            //console.log(error.response.statusText);
        } else if(error.request){
            //console.log(error.request);
        } else {
          //  console.log("Erreur inconnu: ", error.message); 
        }
        //console.log(error);
    }

}


/**
 * 
 * @param {*} connectionId 
 * @returns 
 */
async function sendProofRequest(connectionId){

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
                                "cred_def_id": "FUKLxsjrYSHgScLbHuPTo4:3:CL:29366:RegistreAccesVirtuelCQEN-0.1.2-flihp"
                            }
                        ]
                    }
                }, 
                "requested_predicates" : {}
            }
        };

    try{
        const response = await axios.post(`${ENDPOINT_INVITATION}`, body, config);
        console.log("PROOF-REQUEST: ", response.data);
        console.log("PRES EX ID: ", response.data.presentation_exchange_id);
        await poolingProofRequest(response.data.presentation_exchange_id); 
        //return response;
    } catch(error){
        console.log("Erreur de generation de la proof-request..."); 
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


async function poolingProofRequest(presentationExchangeId){

    console.log("Pooling la presentationExchangeId: ", presentationExchangeId); 

    let i = 0;
    const proofIntervalId = setInterval(async () => {
        console.log(`PROOF_REQUEST: [${presentationExchangeId}] [${i}]` );
        let proofStatus = await getProofRequestStatus(presentationExchangeId);
        //console.log(proofStatus.state);

        if (proofStatus.state == 'response'){    // a changer le contenu de cet if
            clearInterval(intervalId);
            await sendProofRequest(proofIntervalId);
        }
        i++;
    }, 10000);

}


async function getProofRequestStatus(presentationExchangeId){

    axios.defaults.baseURL = BASE_URL;

    try{
        const proofStatus = await axios({
            method: 'get',
            url: `${BASE_URL}/present-proof/records/${presentationExchangeId}`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        console.log("STATUS DE LA PREUVE: ");
        if(proofStatus.data.state == 'presentation_received'){   
            recupereDonneesProof(presentationExchangeId);
        } /*else {
            console.log(proofStatus.data);
        }*/
        //console.log(proofStatus.data);
        return proofStatus.data;
    } catch (error) {
        console.log("error");
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.statusText); 
        if(error.response){ 
            //console.log(error.response.statusText);
        } else if(error.request){
            //console.log(error.request);
        } else {
          //  console.log("Erreur inconnu: ", error.message); 
        }
    }

}


async function recupereDonneesProof(presentationExchangeId){

    axios.defaults.baseURL = BASE_URL;

    try{
        const proofData = await axios({
            method: 'post',
            url: `${BASE_URL}/present-proof/records/${presentationExchangeId}/verify-presentation`,
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json' 
            }
        });
        console.log("STATUS DE LA PREUVE: ");
        console.log(proofData); 
    } catch (error) {
        console.log("error");
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.statusText); 
        if(error.response){ 
            //console.log(error.response.statusText);
        } else if(error.request){
            //console.log(error.request);
        } else {
          //  console.log("Erreur inconnu: ", error.message); 
        }
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
