/*
 * 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torj01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

#define SPI_SS_PIN        10


// ----------------------------
// Configurations de connexion au site 
// ----------------------------

// Mettre just l'addresse base de l'URL qu'on veut se connecter.
#define HOST_ADDRESS "exp-port-e-invitant.apps.exp.openshift.cqen.ca"

// Le reste de l'adresse qui vient après l'URL de base
#define ENDPOINT "/connection"

// OPTIONEL - Le finferprint du site qu'on veut se connecter.
// Le fingerprint changera dans une base regulière, selon les 
// rénovations du certificat. Il faut être conscient que cela 
// peut briser l'application
#define HOST_FINGERPRINT "C1 B5 F2 29 27 9B 46 14 EB 80 3E B3 0F 35 AC 68 26 40 5C 81"

// ----------------------------
// Configurations de tag NFC 
// ----------------------------

// Adresse de l'URL qui sera broadcasté par le NFC
#define didcommInvite   "https://exp-port-e-invitant.apps.exp.openshift.cqen.ca/index.html"

// ----------------------------
// Variables diverses 
// ----------------------------
#define ADDRESS_NON_DISP    0
#define ADDRESS_DISP        1

#define HTTP_PORT           80
#define HTTPS_PORT          443
#define NFC_BUFFER_SIZE     512
