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

# Raccourci - URL shortener 

## Installation

Pour débuter, l'installation des packages nodejs est faite par la commande `npm`: 
  
```bash
$ npm install
```
Ensuite, pour déployer l'application, il faut créer un fichier `.env` dans la racine de l'application, et reinseigner le contenu ci-dessous: 

```bash
# Variables d'environnement
APP=raccourci
SUFFIX=dev
NETWORK=raccourci-network
MODE=DEV
SECRET=

# Variables d'environnement de la bd MySQL
MYSQL_HOST=raccourci-db
MYSQL_PORT=3307
MYSQL_ROOT_PASSWORD=
MYSQL_USER=port-e-user
MYSQL_PASSWORD=
MYSQL_DATABASE=raccourci

# TypeORM 
# Dans les environnements de developpement et d'acceptation, setter à true 
# IMPORTANT: POUR L'ENVIRONNEMENT DE PROD, SETTER À false!!!!! Sinon on risque la perte de données à la prod. 
SYNCHRONIZE=true

```

## Executer l'application

Pour exécuter le projet localement, utiliser les commandes ci-dessous: 

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Le cas d'utilisation plus commun, par contre, sera via container `docker`. Pour exécuter le projet contenairisé, utiliser les commandes ci-dessous: 

```bash
# À la première utilisation, ou après les modifications:  
$ docker-compose build 

# Ensuite, démarrer l'application:
$ docker-compose up 

```

Pour arrêter l'application: 

```bash
$ docker-compose stop 
```

Remove les containers (ensuite, il sera obligatoire refaire le build des containers):

```bash
$ docker-compose down 
```

## Création du record raccourci

Une fois que l'application est deployée, il faut accéder à la fonctionalité de création de record  via Swagger API (http://www.lien...)

À l'endpoint `POST /short-url`, coller le payload suivant pour la création de l'url 

```json 
{
    "originalUrl": "https://www.long-url-qui-sera-diminue",
    "uniqueId": "", 
    "numberClicks": 0, 
    "user": "nomdelusager"
}
```
