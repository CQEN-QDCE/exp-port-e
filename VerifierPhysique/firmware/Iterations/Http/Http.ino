/*
    Un projet d'exemple pour faire des connexions HTTP/HTTPS avec du ESP8266 / NodeMCU.
    Il se connectera  

    https://github.com/witnessmenow/arduino-sample-api-request/blob/master/ESP8266/HTTP_GET/HTTP_GET.ino

*/

// ----------------------------
// Standard Libraries
// ----------------------------
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

// -----------------------------
// Fichiers header personnalisés
// -----------------------------
#include "arduino_secrets.h"
#include "thingProperties.h"

// -----------------------------
// Variables globales 
// -----------------------------

// Client HTTPS
WiFiClientSecure client;

// État de l'adresse: 
//    si l'adresse n'existe pas ou est utilisé, son état est 0
//    sinon, si l'adresse est généré et pas encore consommé, son état est 1 
int etatAdresse;

void setup(){
    Serial.begin(115200);

    // -----------------------------
    // Configuration du WiFi 
    // -----------------------------

    // Connecter au WiFi
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);

    // Tentative de connection au réseau Wifi:
    Serial.print("En train de se connecter au Wifi: ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println("");
    Serial.println("WiFi connecté");
    Serial.println("Address IP: ");
    IPAddress ip = WiFi.localIP();
    Serial.println(ip);
    
    // Si vous n'avez pas besoin de chercker le fingerprint
    // client.setInsecure();

    // Si vous voulez checker le fingerprint
    client.setFingerprint(HOST_FINGERPRINT);


    // -----------------------------
    // Configuration ... 
    // -----------------------------
    etatAdresse = ADDRESS_NON_DISP; 

    makeHttpRequest();
}


void loop(){
    // Les instructions du loop sont inscrits ici

    // Vérifie l'état de l'addresse. Si l'adresse n'est pas disponible, faire appel
    // à la méthode makeHttpRequest() pour créér un novel adresse. 
    if(etatAdresse == ADDRESS_NON_DISP){
      makeHttpRequest();   
    }
}

/**
 * 
 */
void makeHttpRequest(){

    // Ouvre la connexion avec le serveur (utiliser porte 80 [HTTPS_PORT] si HTTP)
    if (!client.connect(HOST_ADDRESS, HTTPS_PORT))
    {
        Serial.println(F("Connexion non réussie"));
        return;
    }

    // laisse un peu de temps à l'ESP
    yield(); 

    // Envoie la requête HTTP 
    client.print(F("GET "));

    // Endpoint: c'est la deuxième partie de la requête (tout ce qui vient après l'URL de base)
    client.print(ENDPOINT);  
    
    // HTTP 1.0 est l'ideal 
    client.println(F(" HTTP/1.0")); 

    // Headers 
    client.print(F("Host: "));
    client.println(HOST_ADDRESS);

    client.println(F("Cache-Control: no-cache"));

    if (client.println() == 0)
    {
        Serial.println(F("L'envoi de la requête n'est pas réussie"));
        return;
    }

    // Check HTTP status
    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));

    // Serial.println("Status: " + status.toString()); 

    // Saute les HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders))
    {
        Serial.println(F("Réponse invalide"));
        return;
    }

    // Les APIs qui répondent avec HTTP/1.1, on doit enlever les données
    //
    // peek() va lire le character, mais ne vas pas l'enlever de la queue
    String address = ""; 
    while (client.available() && client.peek() != '{' && client.peek() != '[')
    {
        char c = 0;
        client.readBytes(&c, 1);
        address += c; 
    }

    Serial.println("Address: " + address);

    // Atribue l'état disponible pour l'adresse
    etatAdresse = ADDRESS_DISP; 
    
    // Lorsque le client sera disponible, on lira chave byte encore disponible
    // et on l'imprimera dans le serial monitor
    while (client.available())
    {
        char c = 0;
        client.readBytes(&c, 1);
        Serial.print(c);
    }
}
