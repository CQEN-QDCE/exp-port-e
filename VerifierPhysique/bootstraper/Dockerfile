############################
### BUILD POUR LOCAL DEV ###
############################

FROM node:18-alpine3.17 as development

# Créér la structure de repertoires
WORKDIR /usr/src/app

# Copiez les manifestes de dépendance d'application dans les images de conteneur.
# Un wildcard est utilisé pour assurer la copie de package.json et package_lock.json (si disponible).
# Copier ceci en premier empêche de relancer l'installation de npm à chaque changement de code.
COPY --chown=node:node package*.json ./

# Installer les dépendances de l'application.
RUN npm install

# Regrouper la source de l'application
COPY --chown=node:node . .

# Utiliser l'utilisateur node de l'image (au lieu de l'utilisateur root)
USER node

# Démarrer le serveur
CMD [ "node", "app.js" ]
