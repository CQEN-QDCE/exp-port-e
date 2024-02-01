<!-- ENTETE -->
[![img](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--P-blue)](https://github.com/CQEN-QDCE/.github/blob/main/LICENCE.md)

---

<div>
    <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" />
</div>
<!-- FIN ENTETE -->

# Déploiement sur Openshift 

Il faut d'abord faire la création du projet sur Openshift s'il n'existe pas déjà. 

Après la création du dépôt, faites déployer le template, en mettant le fichier de paramètres en entrée de la commande `oc process`. 

```
oc new project exp-port-e --display-name "Experimentation Port-e" --description="Expérimentation du portefeuille en tant qu'employé" 

```
## Variables d'environnement 

Il faut attribuer, pour chaqu'un des pods qui seront déployés, les fichiers d'environnement qui contiendront des variables, des secrets et des informations d'environnement. 

Pour démarrer la copie des fichiers .env, exécutez le script `scripts/manage init_env`.  

Les variables manquantes dans fichiers suivants devront être complétés avec vos informations de configuration préférés: 

    openshift 
    |----> templates
         |----> issuer 
              |----> agent 
                   |----> aries-issuer.candy-dev.params.env
              |----> backend 
                   |----> nestjs.backend-dev.params.env
              |----> controller 
                   |----> controller-port-e-build.params.env
                   |----> controller-port-e-deploy.params.env
         |----> verificateur-physique
              |----> agent
                   |----> aries-consommateur.candy-dev.params.env
              |----> daemon
                   |----> port-e-invitant.params.env
              |----> url-courte
                   |----> port-e-url-courte.params.env

