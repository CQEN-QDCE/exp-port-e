#  Port-e physique  

## Guide de connexion 

- Connecter le portable au cellulaire wifi
- Connecter le webserver NodeMCU au cellulaire. Prendre en note l'adresse IP de l'adresse
- Lancer un processus ngrok en utilisant le script `start_ngrok.sh <ip adresse du NodeMCU>`
- Lancer le script `enregistrer_tunnel.sh`; ce script lit la configuration du tunnel ngrok via son API, et enregistre au pod `dc/port-e-invitant`, une variable d'environnement `HOST_TUNNEL`, qui contient l'adresse actuellement alloué au tunnel.  (OBS: comme le serveur NodeMCU n'a pas de certificat, il ne faut pas utiliser l'adresse https. Le script s'assure de changer le protocole avant d'enregistrer dans le pod d'Openshift). Le pod `port-e-invitant` sera recyclé automatiquement (scale up, down). 
- Connecter l'Arduino NFC. Accompagner par la porte serial la génération de l'adresse.
- Reseter le controlleur Arduino pour démarrer la génération et polling d'adresses
- Faire lecture du NFC avec le téléphone, et attendre l'ouverture de la porte. 
