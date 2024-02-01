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

# Configurer Port-E-backend le backend de la gestion d'accès pour déploiement sur OpenShift

Ce dépôt contient les instructions nécessaires pour configurer le déployement du backend de la gestion d'accès sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [nestjs.backend.yaml](../../openshift/templates/issuer/backend/nestjs.backend.yaml) | Installation de l'application. |
| [nestjs-backend-dev.param](../../openshift/templates/issuer/backend/nestjs-backend-dev.params) | Paramètres pour un environnement de développement. |
| [nestjs.backend-dev.params.env](../../openshift/templates/issuer/backend/nestjs.backend-dev.params.env) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis avant le déploiement de l'application avec le script `manage`. 

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple). 

Voici la liste des paramètres qui doivent être renseignés dans le fichier `nestjs.backend-dev.params.env`: 

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | backend |
| **APP_GROUP** |  Nom assigné à tous les déploiements de ce projet. | backend |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. | apps.exp.openshift.cqen.ca |
| **APP_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | exp-port-e-backend |
| **GIT_REF** | Référence de la branche dans Github utilisée pour faire build de l'application. | dev |
| **POSTGRESQL_NAME** | Nom assigné à tous les objets PostgreSQL déployés par le gabarit. | backend-db |
| **POSTGRESQL_PASSWORD** | Mot de passe de l'utilisateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe de l'utilisateur administrateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_VOLUME_SIZE** | Taille d'allocation du volume à créér pour la BD. | 1Gi |
| **AGENT_API_KEY** | La clé qui donne accès à la console de l'admin de l'agent du portefeuille. | {auto-généré} |
| **AGENT_URL** | | https://exp-port-e-issuer-agent-admin.apps.exp.openshift.cqen.ca |
| **WEBHOOK_URL** | L'adresse de l'endpoint de l'agent qui répond aux requêtes reçues, dans le format https://<APP_DOMAIN>.<AGENT_SUBDOMAIN>/webhook | https://exp-porte-service-verification-courriel.apps.exp.openshift.cqen.ca/webhooks |
| **STORAGE_CLASS_NAME** | Nom de la classes de stockage utilisée par les volumes. | efs-1000 |

--- 

Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://<APP_SUBDOMAIN>.<APP_DOMAIN>.