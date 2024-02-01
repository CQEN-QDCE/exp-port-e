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

#######################
### BUILD POUR PROD ###
#######################

FROM node:18-alpine3.17 as builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Pour exécuter 'npm run build', nous avons besoin d'accéder à la CLI NestJS qui est une dépendance de développement.
# Dans l'étape de développement précédente, nous avons exécuté 'npm ci' qui a installé toutes les dépendances, afin 
# que nous puissions copier sur le répertoire node_modules de l'image de développement
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . . 

# Exécutez la commande build qui crée le bundle de production
RUN npm run build

# Définir la variable d'environnement NODE_ENV
ENV NODE_ENV production

# L'exécution de 'npm ci' supprime le répertoire node_modules existant et en transmettant --only=production
# on garantit que seules les dépendances de production sont installées. Cela garantit que le répertoire
# node_modules est aussi optimisé que possible. 
RUN npm ci --only=production && npm cache clean --force

USER node

##################
### PRODUCTION ### 
##################

FROM node:18-alpine3.17 as PRODUCTION

# Copiez le code fourni de l'étape de construction vers l'image de production
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Démarrer le serveur en utilisant la version de production
CMD [ "node", "dist/main.js" ]