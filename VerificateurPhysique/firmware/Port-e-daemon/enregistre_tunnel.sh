 #!/bin/bash
#
#  Copyright (c) 2023 Gouvernement du Québec
#  Auteur: Julio Cesar Torres (torjc01)
#  SPDX-License-Identifier: LiLiQ-R-v.1.1
#  License-Filename: /LICENSE
#
# Script qui lance le tunnel ngrok pour le serveur 
# qui répond à l'adresse IP en paramètre. 
#

echo "Démarre le tunneling ngrok vers le serveur IoT" 
# Variable reçoit l'adresse IP
IP_ADDR=$1

# ###################################
#  Vérifie si l'on est connecté à oc
# ################################### 
#CONN_OC=$(oc whoami)
#NON_CONN=Forbidden 
#prefix=${CONN_OC%%$NON_CONN*}
#index=${#prefix}
 
#if [[ index -gt 0 ]];
#then
#    echo "Index of substring in string : $index"
#    exit 9
#else
#    echo "Substring is not present in string."   
#fi

# #############################################################################
# Vérifie si l'adresse IP est innexistant; si c'est le case 

echo "Inspectionner l'adresse attribué par ngrok, changer le protocole https pour http" 

PROT='http:'
SITE_URL=$(curl http://localhost:4040/api/tunnels | jq --raw-output '.tunnels[] | .public_url'); 
SITE_URL="${PROT}$(echo $SITE_URL | cut -d':' -f 2)"
echo $SITE_URL

echo "Seter la variable d'environnement dans Openshift" 
oc set env dc/port-e-invitant --overwrite HOST_TUNNEL=$SITE_URL
