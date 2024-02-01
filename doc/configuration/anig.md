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

# Configurer Port-E-id (ANIG) pour déploiement sur OpenShift

Ce dépôt contient les instructions nécessaires pour configurer le déployement de l'émetteur Port-E-id pour l'obtention d'une attestation d'identité numérique gouvernementale (ANIG) sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [anig-template.yaml](../../openshift/templates/anig/anig-template.yaml) | Installation de l'application. |
| [anig-issuer.candy-dev.params](../../openshift/templates/anig/anig-issuer.candy-dev.params) | Paramètres pour un environnement de développement. |
| [anig-issuer.candy-dev.params.env](../../openshift/templates/anig/anig-issuer.candy-dev.params.env) | Fichier d'environnement pour les paramètres. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors du déploiement de l'application avec le script `manage`. 

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple). 

Voici la liste des paramètres qui doivent être renseignés dans le fichier `anig-issuer.candy-dev.params.env`: 

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_GROUP** | Nom utilisé pour regrouper les composantes ensembles dans la console OpenShift. | anig |
| **ENV_NAME** | Nom de l'environnement auquel le déploiement sera fait. | dev |
| **ACAPY_NAME** | Nom de l'agent utilisé par l'émetteur d'attestatations. | agent-anig |
| **IMAGE_NAMESPACE** | Namespace utilisé par Openshift pour agrouper les composants de différent projets. | port-e-1 |
| **POSTGRESQL_NAME** | Nom assigné à tous les objets PostgreSQL déployés par le gabarit. | wallet |
| **POSTGRESQL_PASSWORD** | Mot de passe de l'utilisateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_ADMIN_PASSWORD** | Mot de passe de l'utilisateur administrateur PostgreSQL. | {auto-généré} |
| **POSTGRESQL_IMAGE** | Nom de l'image du containeur de PostgreSQL. | database |
| **POSTGRESQL_TAG**   | Tag de la version de l'image du conteineur de PostgreSQL. | latest |
| **APP_DOMAIN** | Le nom de domaine externe pour accéder à l'application. | |
| **AGENT_SUBDOMAIN** | Le nom de sous domaine pour accéder à l'application. | exp-anig |
| **AGENT_VERSION** | La version de l'agent aca-py utilisé.| py36-1.16-1_0.7.5 |
| **WALLET_TYPE** | Le type de wallet qui est utilisé par l'agent.  | askar |
| **ACAPY_LABEL** | Le label voulu à être affiché dans les attestations. | Attestation Numérique Indetité Gouvernementale |
| **AGENT_DID** | Le DID du portefeuille de l'agent avec lequel les attestations seront émises. |  |
| **AGENT_DID_SEED** | Le seed du DID du portefeuille de l'agent. | |
| **WALLET_ENCRYPTION_KEY** | La clé cryptographique d'encryption du portefeuille de l'agent. | |
| **ADMIN_API_KEY** | La clé qui donne accès à la console de l'admin de l'agent du portefeuille. | |
| **GENESIS_FILE_URL** | L'adresse du genesis file du ledger auquel les transactions sont enregistrées. | https://raw.githubusercontent.com/ICCS-ISAC/dtrust-reconu/main/CANdy/dev/pool_transactions_genesis |
| **WEBHOOK_URL** | L'adresse de l'endpoint de l'agent qui répond aux requêtes reçues, dans le format https://<APP_DOMAIN>.<AGENT_SUBDOMAIN>/webhook | https://exp-anig.apps.exp.openshift.cqen.ca/webhooks  |
| **STORAGE_CLASS_NAME** | Nom de la classes de stockage utilisée par les volumes. | efs-1000 |
| **STORAGE_ACCESS_MODES** | Mode d'accès aux volumes de données alloués pour l'application. | ReadWriteMany |
| **MEMORY_LIMIT** | ... | 1000Mi |
| **CPU_LIMIT** | ... | 750m |




Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://<APP_SUBDOMAIN>.<APP_DOMAIN>.