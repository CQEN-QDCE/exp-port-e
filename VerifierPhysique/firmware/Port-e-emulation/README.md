# Emulation de carte NFC 

- L'émulation de carte NFC est faite dans le context du projet port-E pour realiser le broadcast d'une invitation à connexion, dirigée au Portefeuille Numérique QC. 

- La taille du `didcomm`est un facteur d'instabilité. 

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

