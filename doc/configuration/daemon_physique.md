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

# Configurer le daemon de communication avec le physique sur OpenShift

Ce dépôt contient les instructions nécessaires pour configurer le déployement du daemon qui contrôle et se communique avec les dispositifs physiques sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [port-e-daemon.yaml](../../openshift/templates/auth-e/auth-e.yaml) | Installation de l'application. |
| [port-e-daemon.params](../../openshift/templates/auth-e/port-e-daemon.params) | Paramètres pour un environnement de développement. |
| [port-e-daemon.params.env](../../openshift/templates/auth-e/port-e-daemon.params.env) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors du déploiement de l'application avec le script `manage`. 

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple). 

La liste des paramètres qui doivent être renseignés dans le fichier `port-e-daemon.params.env`: 


| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | auth-e |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. | |
| **APP_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | auth-e |
| **GIT_REPOSITORY_URI** | L'URL de l'adresse du dépot Git. | https://github.com/CQEN-QDCE/exp-port-e.git |
| **GIT_REF** | Référence de la branche dans Github utilisée pour faire build de l'application. | dev |
| **CONTEXT_SOURCE_DIR** | Répertoire de contexte de build | Raccourcir-URL |
| **BASE_URL** | L'adresse de l'application du consommateur, déployée sur Openshift. | https://exp-port-e-consommateur-agent-admin.apps.exp.openshift.cqen.ca  |
| **BASE_SHORT_URL** | L'adresse du raccourcisseur d'url qui répond aux demandes du daemon. | https://p.apps.exp.openshift.cqen.ca |
| **HOST_PORTE_URL** | L'adresse du hôte ngrok qui fait du tunnelling à partir du dispositif physique vers l'application déployée sur Openshift  | http://ngrok.io |
| **ENDPOINT_CONNECTION** | Point de terminaison pour créér une nouvelle connection avec le daemon.   | /connections/create-invitation |
| **ENDPOINT_INVITATION** | Point de terminaison pour faire l'envoi de la requête de présentation à l'agent consommateur de la porte.| /present-proof/send-request |
| **APP_PORT** | La porte du daemon qui écoute les requêtes de connection | 3000 |
| **X_API_KEY** | La clé d'accès de l'API de la base de données de la porte. |  |
