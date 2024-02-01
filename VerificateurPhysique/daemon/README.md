# NFC Daemon App 

Cet application génére les adresses `didcomm://` d'invitation, les raccourcit en utilisant l'app d'URL courte en format deeplink. 


Flux du protocole de communication

Création d'une connexion

invitation -> response 
request-sent -> presentation-received

## Configuration 

Créez un fichier `.env` et renseignez les variables suivates avec vous valeurs: 

```bash
BASE_URL            = https://exp-port-e-consommateur-agent-admin.apps.exp.openshift.cqen.ca    # Url de base de l'api de l'agent consommateur  
BASE_SHORT_URL      = https://e.apps.exp.openshift.cqen.ca/                                     # Url de base de l'application d'URL courte 
ENDPOINT_CONNECTION = /connections/create-invitation?auto_accept=true&multi_use=true            # Endpoint de création de connection à l'agent consommateur
ENDPOINT_INVITATION = /present-proof/send-request                                               # Endpoint de présentation de preuve à l'agent consommateur
X_API_KEY           = x8X4CaS3lLcTlIhV                                                          # API-Key de l'api de l'agent consommateur 
APP_PORT            = 3000                                                                      # Porte de communication du serveur 
```
