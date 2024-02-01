<!-- ENTETE -->
[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

---

<div>
    <a target="_blank" href="https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique">
      <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" alt="Logo du Ministère de la cybersécurité et du numérique" />
    </a>
</div>
<!-- FIN ENTETE -->

#  Port-e physique - Guide de connexion

1. Connecter l'ordinateur au réseau (par cellulaire ou wifi, selon la disponibilité);
1. Lancer les sketches `./firmware/Port-e-daemon/Port-e-daemon.ino` et `./firmware/Port-e-beacon/Port-e-beacon.ino` et ouvir leurs **Serial Monitors**; 
1. Connecter le cable du webserver NodeMCU à l'ordinateur. Le webserver se connectera automatiquement au réseau (vérifiez dans le fichier `./firmware/Port-e-daemon/arduino_secrets.h` qu'il s'agit du même de l'étape précedente). Prendre en note l'adresse IP alloué au NodeMCU (affiché dans le Serial Monitor); 
1. Lancer le script `scripts/manage ngrok_start <ip adresse du NodeMCU>`; ce script lit la configuration du tunnel ngrok via son API, et enregistre au pod `deploymentconfig.apps.openshift.io/port-e-daemon` une variable d'environnement `HOST_TUNNEL`, qui contient l'adresse actuellement alloué au tunnel par ngrok.  
(OBS: comme le serveur NodeMCU n'a pas de certificat, il ne faut pas utiliser l'adresse https. Le script s'assure de changer le protocole avant d'enregistrer dans le pod d'Openshift). Le pod `port-e-daemon` sera recyclé automatiquement (scale up, down). 

```
$ ./manage ngrok_start 192.168.18.24 80
*** ------------------------------------ ***
***  Commande de gestion des opérations  ***
*** ------------------------------------ ***
Démarre a tunnel ngrok
Démarrer le tunnel ngrok pour le serveur a l'adresse IP: [192.168.18.24:80]
Attends 5 sec avant de continuer
Inspectionner l'adresse attribué par ngrok, changer le protocole https pour http
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   454  100   454    0     0   415k      0 --:--:-- --:--:-- --:--:--  443k
http://29c7-107-159-217-164.ngrok-free.app
Seter la variable d'environnement dans Openshift
deploymentconfig.apps.openshift.io/port-e-daemon updated
```

5. Connecter l'Arduino / Beacon NFC. Accompagner par le **Serial Monitor** la génération de l'adresse.
1. Reseter le controlleur Arduino pour démarrer la génération et polling d'adresses
1. Approcher le téléphone mobile au *Beacon NFC*, et attendre l'ouverture de la porte. 
