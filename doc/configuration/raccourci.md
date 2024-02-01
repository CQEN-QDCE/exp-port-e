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

# Configurer le raccourcisseur d'URLs pour déploiement sur OpenShift

Ce dépôt contient les instructions nécessaires pour configurer le déployement d'ANIG sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [port-e-url-shortner.yaml](../../openshift/templates/raccourci-url/port-e-url-shortner.yaml) | Installation de l'application. |
| [port-e-url-shortener.params](../../openshift/templates/raccourci-url/port-e-url-shortener.params) | Paramètres pour un environnement de développement. |
| [port-e-url-shortener.params.env](../../openshift/templates/raccourci-url/port-e-url-shortener.params.env) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors du déploiement de l'application avec le script `manage`. 

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple). 

Voici la liste des paramètres qui doivent être renseignés dans le fichier `anig-issuer.candy-dev.params.env`: 

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | exp-port-e-raccourci |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. | |
| **APP_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | raccourci |
| **POSTGRESQL_NAME** | Nom assigné à tous les objets PostgreSQL déployés par le gabarit. | postgres-database |
| **POSTGRESQL_PORT** | Numéro de porte de la base de données PostgreSQL déploiée. Utilisé seulement quand le WALLET_STORAGE_TYPE=postgres_storage.  | 5432 |
| **POSTGRES_DB** | Nom de la base de données PostgreSQL.| porte |
| **POSTGRESQL_DATABASE_NAME** | Nom du service de base de données PostgreSQL. | porte |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe pour le compte d'administration 'postgres'. Necessite être encondé en base64.  | {auto-généré} |
| **POSTGRESQL_ADMIN_USERNAME** | Nom d'usager de l'administrateur PostgreSQLque sera utilisé pour accéder la base de données. | postgres |
| **POSTGRESQL_PASSWORD** | Mot de passe de connexion à la base de données PostgreSQL. Necessite être encondé en base64. | {auto-généré} |
| **POSTGRESQL_USERNAME** | Nom d'usager PostgreSQLque sera utilisé pour accéder la base de données. | dbuser |
| **GIT_REPOSITORY_URI** | L'URL de l'adresse du dépot Git. | https://github.com/CQEN-QDCE/exp-port-e.git |
| **GIT_REF** | Référence de la branche dans Github utilisée pour faire build de l'application. | dev |
| **CONTEXT_SOURCE_DIR** | Répertoire de contexte de build | Raccourcir-URL |


Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://<APP_SUBDOMAIN>.<APP_DOMAIN>.