 #!/bin/bash
#
#  Copyright (c) 2023 Gouvernement du Québec
#  Auteur: Julio Cesar Torres (torjc01)
#  SPDX-License-Identifier: LiLiQ-R-v.1.1
#  License-Filename: /LICENSE
#
# Script qui lance le tunnel ngrok pour le serveur 
# qui répond à l'adresse IP en paramètre. 

# Variable reçoit l'adresse IP
IP_ADDR=$1

# Vérifie si l'adresse IP est innexistant; si c'est le cas, fournir une erreur
if [ -z ${IP_ADDR} ]; then
    echo "Erreur de parametrisation" 
    echo "Utilisation: sh start_ngrok.sh <ip address>" 
    exit 0
else 
    echo "Démarrer le tunnel ngrok pour le serveur a l'adresse IP: [${IP_ADDR}]" 
    ngrok http --host-header=rewrite ${IP_ADDR}:80
fi
