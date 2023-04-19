

## Realisation du backup d'une bd sans avoir à se connecter avec un autre pod

Du portable vers le pod OpenShift: 

oc rsync <repertoire-origine-local> <nom-du-pod>:<repertoire-destination-pod>

Ex: oc rsync /Users/flihp/Downloads/fr_CA dolibarr-1-rqxcf:/var/www/html/langs

Du pod OpenShift vers le portable: 

oc rsync <nom-du-pod>:<repertoire-origine-pod> <repertoire-destination-local>

Ex: oc rsync dolibarr-1-rqxcf:/var/www/html/langs/fr_CA .


## Exécuter le backup 

Créer un fichier d'environnement appelé `.env`, et définir les variables ci-dessous: 

```
DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_USER=
DATABASE_HOST=
DATABASE_PORT=
```

## Connexion a un pod et a une BD mongo

1 - Connecter au pod du mongo: 
```
oc exec -it <nom-pod-mongo> -- bash 
```

2 - Connecter à la BD, en passant les parametres: 
```
mongosh "mongodb://<host>:<port>" --username <nom-usager> --authenticationDatabase <nom-bd>  --password <mdp-bd>
```

**Syntaxe mongo**

```
show collections

db.movies.insertOne(
   {
     title: "The Favourite",
     genres: [ "Drama", "History" ],
     runtime: 121,
     rated: "R",
     year: 2018,
     directors: [ "Yorgos Lanthimos" ],
     cast: [ "Olivia Colman", "Emma Stone", "Rachel Weisz" ],
     type: "movie"
   }
 )
 
db.movies.find()
``` 