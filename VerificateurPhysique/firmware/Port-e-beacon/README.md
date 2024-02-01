# Port-e-Beacon - Emulation de carte NFC via a beacon

Un beacon NFC (Near Field Communication) est un dispositif électronique sans fil qui émet des signaux radio pour transmettre des informations à des lecteurs NFC. Les beacons NFC sont utilisés pour l'identification, le suivi, la localisation et la communication sans contact avec des objets, des produits ou des personnes. Voici les composants clés d'un beacon NFC et son fonctionnement :

- Émetteur NFC: Le beacon NFC contient une puce NFC qui génère un signal radio à une fréquence spécifique. Cette puce est généralement de type passif, ce qui signifie qu'elle ne possède pas de source d'alimentation interne et dépend de l'énergie fournie par le lecteur NFC lors de la communication.

- Antenne: Le beacon NFC est équipé d'une antenne qui émet le signal radio généré par la puce NFC. L'antenne assure que le signal radio est diffusé efficacement dans l'environnement.

- Identification unique: Chaque beacon NFC est généralement associé à une identité unique, qui peut être un numéro d'identification unique (ID) ou une adresse électronique. Cette identité permet aux lecteurs NFC de distinguer un beacon d'un autre.

- Transmission de données: Lorsqu'un lecteur NFC entre dans la portée d'un beacon, il peut recevoir les données transmises par ce beacon. Ces données peuvent inclure des informations telles que l'identité du beacon, des données de localisation, des numéros de série de produits, des informations de suivi, etc.

- Applications: Les beacons NFC sont largement utilisés dans divers domaines, notamment la gestion des stocks, la logistique, la gestion des actifs, la vente au détail, la sécurité, la gestion des inventaires, la gestion de la chaîne d'approvisionnement, la surveillance de l'emplacement des objets, etc. Ils permettent d'automatiser des processus et d'améliorer la visibilité et le suivi des actifs.

En résumé, un beacon NFC est un dispositif de communication sans fil qui utilise la technologie NFC pour émettre des signaux radio contenant des informations utiles. Ces signaux sont captés par des lecteurs NFC à proximité, permettant ainsi de collecter des données et de réaliser diverses applications de suivi, de gestion et de communication.





- Vérifie s'il y a un adresse à broadcaster

    - si non, appele Porte-e-Daemon pour demander la génération d'un nouveau via SerialComms UART

- Reçoit l'adresse à broadcaster

- Créér message NDEF, inclut l'adresse

- Émulation et broadcast de l'adresse. Bloque le sketch jusqu'à qu'une lecture soit faite par un usageur.  



- L'émulation de carte NFC est faite dans le context du projet port-E pour realiser le broadcast d'une invitation à connexion, dirigée au Portefeuille Numérique QC. 

- La taille du `didcomm` est un facteur d'instabilité. 

```
didcomm://invite?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYmMzYWMzZDktN2Q4Yi00YTNlLWFmY2UtZjQyMTliMzY2MzM3IiwgInJlY2lwaWVudEtleXMiOiBbIjJNZzFyb3dkenNZQXp1azZDRGJndVlEdEx4Z2V2QTdFVm16Y1BnMlJhbUxIIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cHM6Ly9leHAtcG9ydC1lLXY0LmFwcHMuZXhwLm9wZW5zaGlmdC5jcWVuLmNhIiwgImxhYmVsIjogIlNlcnZpY2UgZGUgdlx1MDBlOXJpZmljYXRpb24gZGUgY291cnJpZWwgZHUgQ1FFTiJ9
```

- La lecture du `didcomm` par le NFC prend trop de longtemps, puis il ne faut pas bouger le cel, ce qu'entraîne la perte de la connexion - et oblige de tout recommencer. 

- Dépendement du lecteur (p.ex. NFC Tools), la lecture échoue à cause de la taille du didcomm; NFC téléphone: long à lire et après lecture n'arrive pas à bien ouvrir le portefeuille, qui ne répond pas. 

- En plus, elle consomme grande partie de la mémoire, ce que laisse insuffisament de mémoire pour les autres fonctions du microcontrolleur. 

- Raccourcir l'invitation `didcomm` avec un `url-shortener`

- Les url-shorteners disponibles dans le marché valident l



**Benefices:** 

- la taille de l'url a de l'allure pour l'utilisation: 
    - consomme peu de mémoire
    - est lue et consommée rapidement
- viabilise la consommation de l'invitation via une étape de traduction

**Problème:**

- il faut une autre intéraction de l'usager avec l'écran du téléphone

https://www.shortnsweet.link/

https://www.shortnsweet.link/api 

https://www.shortnsweet.link/v1/short-url


```
JSON payload endpoint POST /v1/short-url

{
    "originalUrl": "didcomm://invite?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiYmMzYWMzZDktN2Q4Yi00YTNlLWFmY2UtZjQyMTliMzY2MzM3IiwgInJlY2lwaWVudEtleXMiOiBbIjJNZzFyb3dkenNZQXp1azZDRGJndVlEdEx4Z2V2QTdFVm16Y1BnMlJhbUxIIl0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cHM6Ly9leHAtcG9ydC1lLXY0LmFwcHMuZXhwLm9wZW5zaGlmdC5jcWVuLmNhIiwgImxhYmVsIjogIlNlcnZpY2UgZGUgdlx1MDBlOXJpZmljYXRpb24gZGUgY291cnJpZWwgZHUgQ1FFTiJ9",
    "uniqueId": "", 
    "numberClicks": 0, 
    "user": "juliozohar"
}
```






**Fichiers à faire backup**

```
check.sh 

/etc/fail2ban/checkall.sh
/etc/fail2ban
/etc/fail2ban/jail.local

/etc/nginx/nginx.conf
/etc/nginx/sites-available/shortnsweet.link
```

