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

# exp-attestation-emploie-acces

Expérimentation sur l'utilisation du portefeuille numérique en tant qu'employé afin qu'il puisse accéder au site web utilisé pour son travail et également déverrouiller les portes d’accès sur les lieux de travail

## Installation 

### Compose 

Avant de lancer `docker-compose` il faut suivre les étapes suivantes: 

- créér les fichier d'environnement `/.env` et renseigner les valeurs souhaités pour les variables: 

**/.env**
```env 
# Variables d'environnement
APP=port-e
SUFFIX=dev
NETWORK=nestjs-network
MODE=DEV

# Variables d'environnement de la bd postgresql
POSTGRES_HOST=localhost
POSTGRES_PORT=45432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=porte

# Variables d'environnement de l'outil pgadmin
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

```

Ensuite, faites le build de l'image: 

```
docker-compose build
```

Une fois l'image bâtie, lancez-la: 

```
docker-compose up
```

Les endpoints sont disponibles à l'adresse [http://localhost:43000](http://localhost:43000);

La page de la documentation de l'API est accessible à [http://localhost:43000/api](http://localhost:43000/api); 

L'outil d'administration de la BD `pgAdmin` est disponible à l'adresse: [http://localhost:48080](http://localhost:48080). 


## Références 

Création d'une workbench  
https://www.popularmechanics.com/workbench

Making a makerspace  
https://www.norwegiancreations.com/2015/05/making-a-makerspace/

Travaux bluetooth Ontario  
https://github.com/decentralized-identity/didcomm-bluetooth/blob/main/spec.md

Articles sur contrôle d'accès physique   
https://www.securityinfowatch.com/access-identity/article/21271526/the-current-state-of-physical-access-control-technology

https://www.greetly.com/blog/physical-security-access-control-systems

https://www.identiv.com/about/  (Identiv - Entreprise qui travaille avec securité physique)



*Using ESP8266 to call RESTful API from TheRide to get real-time BUS data*

https://www.youtube.com/watch?v=-1dSZIs3ISw

https://github.com/debsahu/RESTful-Ride

https://github.com/jdunmire/kicad-ESP8266

***** *ESP8266 Web Client For API Access Using Arduino IDE (Mac OSX and Windows) | Weather Station Demo*  
https://www.youtube.com/watch?v=8xqgdXvn3yw - ver tabmém a introducao ao ESP8266 na descricao do video   


*Introduction to ESP32 - Getting Started*  
https://www.youtube.com/watch?v=xPlN_Tk3VLQ

NFC avec Arduino  
https://werner.rothschopf.net/201703_arduino_esp8266_nfc.htm


*TLV Utilities*  
https://emvlab.org/tlvutils/
