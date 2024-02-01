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

# Configurer Port-E-Auth pour déploiement sur OpenShift

Ce dépôt contient les instructions nécessaires pour configurer le déployement de Port-E-Auth sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [auth-e.yaml](../../openshift/templates/auth-e/auth-e.yaml) | Installation de l'application. |
| [auth-e-keycloak-realm.yaml](../../openshift/templates/auth-e/auth-e-keycloak-realm.yaml) | Configuration du realm Keycloak. |
| [auth-e.dev.params](../../openshift/templates/auth-e/auth-e.dev.params) | Paramètres pour un environnement de développement. |
| [auth-e.dev.params.env](../../openshift/templates/auth-e/auth-e.dev.params) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors du déploiement de l'application avec le script `manage`. 

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple). 

La liste des paramètres qui doivent être renseignés dans le fichier `auth-e-dev.params.env`: 



| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | auth-e |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. | |
| **APP_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | auth-e |
| **POSTGRESQL_USERNAME** | Nom d'utilisateur PostgreSQL. | dbuser |
| **POSTGRESQL_PASSWORD** | Mot de passe de l'utilisateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_ADMIN_USERNAME** | Nom d'utilisateur de l'administrateur PostgreSQL. | postgres |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe de l'utilisateur administrateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_DATABASE_NAME** | Nom de la base de données de l'application. | auth-e |
| **POSTGRESQL_PORT** | Numéro de port sur lequel PostgreSQL écoute. | 5432 |
| **POSTGRESQL_NAME** | Nom assigné à tous les objets PostgreSQL déployés par le gabarit. | postgres-database |
| **POSTGRESQL_VOLUME_SIZE** | Capacité du volume persistant PostgreSQL. | 1Gi |
| **NESTJS_NAME** |  Nom assigné à tous les objets NestJs déployés par le gabarit. | nestjs-backend |
| **ANGULAR_NAME** |  Nom assigné à tous les objets Angular déployés par le gabarit. | angular-frontend |
| **KEYCLOAK_SUBDOMAIN** | Le nom de sous domaine pour accéder à Keycloak. | auth-e-keycloak |
| **KEYCLOAK_ADMIN_USER** | Nom d'utilisateur de l'administrateur Keycloak. | admin |
| **KEYCLOAK_ADMIN_PASSWORD** | Mot de passe de l'utilisateur administrateur Keycloak. | {auto-généré} |
| **KEYCLOAK_REALM** | Nom du domain keycloak de l'application | Auth-E |
| **KEYCLOAK_CLIENT_ID** |  Nom assigné à tous les objets NestJs déployés par le gabarit. | angular-app |
| **KEYCLOAK_DATABASE_NAME** | Nom de la base de données de Keycloak. | keycloak |
| **GITHUB_REPOSITORY_URI** | Uri du dépôt de code de l'application. | https://github.com/CQEN-QDCE/exp-port-e.git |
| **STORAGE_CLASS_NAME** | Nom de la classes de stockage utilisée par les volumes. | gp2 |
| **NGINX_PORT** | Numéro de port sur lequel NGINX écoute. | 8080 |


Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://<APP_SUBDOMAIN>.<APP_DOMAIN>.