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

# Configurer le contrôlleur Port-E-mail de l'émetteur pour le compiler et le déployer sur OpenShift

Ce dépôt contient les instructions nécessaires pour faire la compilation et configurer le déployement du contrôlleur de l'émetteur Port-E-mail sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [controller-port-e-build.yaml](../../openshift/templates/issuer/controller/controller-port-e-build.yaml) | Build de l'application. |
| [controller-port-e-build.params](../../openshift/templates/issuer/controller/controller-port-e-build.params) | Paramètres pour un environnement de développement. |
| [controller-port-e-build.params.env](../../openshift/templates/issuer/controller/controller-port-e-build.params.env) | Fichier d'environnement pour les paramètres. |
||||
| [controller-port-e-deploy.yaml](../../openshift/templates/issuer/controller/controller-port-e-deploy.yaml) | Installation de l'application. |
| [controller-port-e-deploy.params](../../openshift/templates/issuer/controller/controller-port-e-deploy.params) | Paramètres pour un environnement de développement. |
| [controller-port-e-deploy.params.env](../../openshift/templates/issuer/controller/controller-port-e-deploy.params.env) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis avant le build de l'application avec le script `manage`. 

### Compilation (Build) 

Le fichier de paramètres permet la personnalisation du build d'un environnement particulier (par exemple). Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis avant le build de l'application avec le script `manage`. 


Voici la liste des paramètres qui doivent être renseignés dans le fichier `controller-port-e-build.yaml`: 

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **NAME** | Nom assigné à tous les resources définis dans ce template. | controller-port-e |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | backend |
| **GRP_APPLICATION** | ... | Gestion-des-acces |
| **ENV_NAME** | Nom de l'environnement.  | tools |
| **GIT_REPO_URL** | L'URL de l'adresse du dépot Git. | https://github.com/CQEN-QDCE/indy-email-verification.git |
| **GIT_REF** | Référence de la branche dans Github utilisée pour faire build de l'application. | dev |
| **SOURCE_CONTEXT_DIR** | Répertoire de contexte de build | src |
| **SOURCE_IMAGE_KIND** | Type d'image. | DockerImage |
| **SOURCE_IMAGE_NAME** | Nom de l'image du source. | registry.access.redhat.com/rhscl/python-36-rhel7 |
| **SOURCE_IMAGE_TAG** | Tag de l'image du source. | latest |
| **OUTPUT_IMAGE_TAG** | Tag de l'image de sortie du processus de build.| latest |

### Déploiement

Le fichier de paramètres permet la personnalisation du build d'un environnement particulier (par exemple). Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis avant le build de l'application avec le script `manage`. 


Voici la liste des paramètres qui doivent être renseignés dans le fichier `controller-port-e-deploy.yaml`: 

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **NAMESPACE_NAME** | Nom du namespace du projet.| port-e-1 |
| **IMAGE_NAMESPACE** | Namespace qui contient les images de l'application. | port-e-1 |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | controller |
| **APP_GROUP** | Nom assigné à tous les objets de ce projet.  | emetteur |
| **SUFFIX** | Suffix utilisé pour tous les objets.  | -port-e |
| **ROLE** | Le rôle du service dans l'application - utilisé pour des Network Policies. | service |
| **TAG_NAME** | La tag de cet environnement, par exemple dev, teste, prod.  | latest |
| **ENV_NAME** | Nom de l'environnement. | dev |
| **IMAGE_NAME** | Nom de l'image qui sera générée. | controller-port-e |
| **APP_MODULE** | Nom d'application, utilisé pour exécuter l'app avec Gunicorn. | email_verification_service.wsgi |
| **APP_CONFIG** | Gunicorn config; option passée à gunicorn -c | python:email_verification_service.settings |
| **WEB_CONCURRENCY** | Contrôle la quantité de gunicorn workers. Ceci doit être mis à 1 quand on utilise un portefeuille SQLite. | 1 |
| **PORT** | Porte que le service va écouter. | 8080 |
| **APPLICATION_DOMAIN** | | exp-porte-service-verification-courriel.apps.exp.openshift.cqen.ca |
| **SITE_URL** | L'adresse URL du site. | https://exp-porte-service-verification-courriel.apps.exp.openshift.cqen.ca |
| **AGENT_ADMIN_API_KEY** | La clé pour l'endpoint d'admin de l'agent. | {auto-généré} |
| **AGENT_ROLE** | Le rôle de l'agent dans l'application - utilisé pour des Network Policies.  | agent |
| **AGENT_SERVICE_NAME** | Nom du service de l'agent. | agent |
| **AGENT_URL** | L'adresse URL pour l'endpoint d'admin de l'agent. | https://exp-port-e-issuer-agent-admin.apps.exp.openshift.cqen.ca |
| **POSTGRESQL_NAME** | Nom du service de base de données PostgreSQL. | controller-db |
| **POSTGRESQL_DATABASE_NAME** | Nom de la base de données PostgreSQL.| aries_issuer |
| **POSTGRESQL_PORT** | Numéro de porte de la base de données PostgreSQL déploiée. Utilisé seulement quand le WALLET_STORAGE_TYPE=postgres_storage.  | 5432 |
| **POSTGRESQL_USER** | Nom d'usager PostgreSQLque sera utilisé pour accéder la base de données. | dbuser |
| **POSTGRESQL_PASSWORD** | Mot de passe de connexion à la base de données PostgreSQL. Necessite être encondé en base64. | {auto-généré} |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe pour le compte d'administration 'postgres'. Necessite être encondé en base64.  | {auto-généré} |
| **POSTGRESQL_IMAGE** | Nom de l'image source. | database |
| **POSTGRESQL_TAG** | Tag de l'image source. | latest |
| **SMTP_EMAIL_HOST** | L'adresse du serveur SMTP qui répond à les envoies de courriel.  | email-smtp.ca-central-1.amazonaws.com |
| **EMAIL_PORT** | Porte que le serveur SMTP écoute pour le courriel. | 587 |
| **EMAIL_USE_TLS** | | True |
| **EMAIL_HOST_USER** | | |
| **EMAIL_HOST_PASSWORD** | | {auto-généré} |
| **DEFAULT_FROM_EMAIL** | Couriel utilisé comme default pour l'utilisation du serveur SMTP. | 'ne-pas-repondre@cqen.ca' |
| **CPU_REQUEST** | Les resources CPU request (in cores) pour ce build. | 10m |
| **CPU_LIMIT** | Les resources CPU limit (quantité de cores) pour ce build.| 250m |
| **MEMORY_REQUEST** | Les resources Memory request (in Mi, Gi, etc) pour ce build. | 10Mi |
| **MEMORY_LIMIT** | Les resources Memory limit (in Mi, Gi, etc) pour ce build. | 1Gi |
| **STORAGE_CLASS_NAME** | La storage class du volume. | efs-1000 |

--- 

Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://<APP_SUBDOMAIN>.<APP_DOMAIN>.