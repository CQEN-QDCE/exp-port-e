
// ----------------------------
// Configurations de connexion au site 
// ----------------------------

// Mettre just l'addresse base de l'URL qu'on veut se connecter.
#define HOST_ADDRESS "exp-port-e-invitant.apps.exp.openshift.cqen.ca"

// Le reste de l'adresse qui vient après l'URL de base
#define ENDPOINT "/getConnection"

// OPTIONEL - Le finferprint du site qu'on veut se connecter.
// Le fingerprint changera dans une base regulière, selon les 
// rénovations du certificat. Il faut être conscient que cela 
// peut briser l'application
#define HOST_FINGERPRINT "3D 35 90 D8 39 77 9E 06 FA 4F E7 47 C1 DC 2B 5F B4 E6 D6 01"

// ----------------------------
// Variables diverses 
// ----------------------------
#define ADDRESS_NON_DISP    0
#define ADDRESS_DISP        1

#define HTTP_PORT           80
#define HTTPS_PORT          443
