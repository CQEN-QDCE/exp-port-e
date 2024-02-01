# Déployer Auth.E sur OpenShift

Ce dépôt contient les instructions nécessaires pour déployer Auth.E sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [auth-e.yaml](https://github.com/foxbike/auth-e/blob/master/openshift/templates/auth-e.yaml) | Installation de l'application. |
| [auth-e-keycloak-realm.yaml](https://github.com/foxbike/auth-e/blob/master/openshift/templates/auth-e-keycloak-realm.yaml) | Configuration du realm Keycloak. |
| [auth-e.dev.params](https://github.com/foxbike/auth-e/blob/master/openshift/templates/auth-e.dev.params) | Paramètres pour un environnement de développement. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors de l'instanciation avec 'oc process'.

Le fichier de paramètres permet la personnalisation de l'installation pour un environnement particulier (par exemple).

Commencer par créer un projet sur OpenShift:
```bash
oc new-project auth-e
```
Lancez l'installation sur OpenShift
```bash
oc process -f ./auth-e-keycloak-realm.yaml --param-file=./auth-e.dev.params | oc apply -f -
oc process -f ./auth-e.yaml --param-file=./auth-e.dev.params | oc apply -f -
```

Une fois que tous les pods sont démarrés, vous pouvez accéder à l'application à l'adresse https://auth-e.<APP_DOMAIN>.

| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **APP_NAME** | Nom utilisé pourregrouper les composantes ensembles dans la console OpenShift. | auth-e |
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
| **GITHUB_REPOSITORY_URI** | Uri du dépôt de code de l'application. | https://github.com/foxbike/auth-e.git |
| **STORAGE_CLASS_NAME** | Nom de la classes de stockage utilisée par les volumes. | gp2 |
| **NGINX_PORT** | Numéro de port sur lequel NGINX écoute. | 8080 |

