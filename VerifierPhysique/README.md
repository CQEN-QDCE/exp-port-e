#  Port-e physique  

## Guide de connexion 

- Connecter le portable au cellulaire wifi
- Connecter le webserver NodeMCU au cellulaire. Prendre en note l'adresse IP de l'adresse
- Lancer un processus ngrok en utilisant le script start_ngrok.sh avec l'adresse générée par ngrok
- Aller dans le podport-e-invitant et changer l'environnement de la variable HOST_PORTE_URL qui 
vient du secret consommateur-invite/host-porte-url. Mettre à jour sa valeur avec l'adresse générée 
par ngrok. (OBS: ne pas utiliser http dans la var d'environnement. Le webserver n'a pas de certificat. Ne pas 
oublier de cliquer) 
- Recycler le pod port-e-invitant (scale up, down)
- Connecter l'Arduino NFC. Accompagner par la porte serial la génération de l'adresse.
- Reseter le controlleur Arduino pour démarrer la génération et polling d'adresses
- Faire lecture du téléphone, et attendre l'ouverture de la porte. 

## Recycler le pod 

