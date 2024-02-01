###########################
### BUILD FOR LOCAL DEV ###
###########################

FROM node:18-alpine3.17 as development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container images. 
# A wildcard is used to ensure copying bothpackage.json and package_lock.json (when available). 
# Copying this first prevents re-running npm install on every code change. 
COPY --chown=node:node package*.json ./

# Install app dependencies using 'npm ci' instead of 'npm install'
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

######################
### BUILD FOR PROD ###
######################

FROM node:18-alpine3.17 as builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run 'npm run build', we need aceess to the Cest CLI which is a dev dependency. 
# In the previous dev stage we ran 'npm ci' which installed all dependencies, so we can copy 
# over the node_modules directory from the development image 
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . . 

# Run the build command which creates the production bundle 
RUN npm run build

# Set the NODE_ENV environment variable
ENV NODE_ENV production

# Running 'npm ci' removes the existing node_modules directory and passing in --only=production
# ensures that only the production dependencies are installed. This ensures that the node_modules
# directory is as optimized as possible. 
RUN npm ci --only=production --omit=dev && npm cache clean --force 

USER node

##################
### PRODUCTION ### 
##################

FROM node:18-alpine3.17 as PRODUCTION

# Copy the bundled code from the build stage to the production image 
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Start the server using the production build 
CMD [ "node", "dist/main.js" ]