############################
### BUILD POUR LOCAL DEV ###
############################

# FROM node:18-alpine3.17 as development
# Build node image from Node Docker Hub
FROM node:18-alpine3.17

#Make app directory in container
RUN mkdir /app

#Identify working directory
WORKDIR /app

#Copy package
COPY package.json /app

#Install rpm packages from package.json
RUN npm install

#Copy over app to app folder
COPY . /app 

#Expose server at port ( accessible outside of container)
EXPOSE  3000 

#Start app 
CMD ["node", "app.js"]
