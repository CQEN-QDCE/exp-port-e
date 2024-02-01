/* Port-e-daemon.ino 
 * Expériementation port-E 
 * Deployé sur NodeMCU 1.0
 * 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torjc01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

// ----------------------------
// Standard Libraries
// ----------------------------
#include "Port-e-daemon.h"

//  Wifi Libs
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266WiFi.h>

// SerialComms Lib 
#include <SoftwareSerial.h>

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
WiFiClient       clientWeb;

// Seter le numéro du port du serveur à 80
WiFiServer server(HTTP_PORT);

// État de l'adresse: 
//    si l'adresse n'existe pas ou est utilisé, son état est 0;
//    sinon, si l'adresse est généré et pas encore consommé, son état est 1 
uint8_t etatAdresse;

// Créé une porte serial virtuale aux pins digitaux 6(RX) et 7(TX)
// Dans le cas de NodeMCU, TX=GPIO5=D1; RX=GPIO4=D2
// Alors, connecter le pin D2 à RX, et D1 à TX; dans le code, référencer par les # gpio (4, 5)
SoftwareSerial porteSerial(GPIO_RX, GPIO_TX);

// Connecté au pin D4, alors gpio #2
const uint8_t pinRelay = GPIO_RELAY; 

// Connecté au pin D5, alors gpio #14
const uint8_t pinLed = GPIO_LED;

// Connecté au pin D6, alors gpio #12
const uint8_t pinBuzzer = GPIO_BUZZER; 

/**
 * La fonction setup() est apellée lorsqu'un sketch démarre. Utilisez-la pour 
 * initialiser les variables, pin modes, démarrer l'utilisation des librairies, etc. 
 * Cette fonction est exécutée une seule fois, après le démarrage ou reset de la plaque Arduino. 
 */
void setup(){
    
    Serial.begin(115200);    // Baud plus vite pour l'application
    porteSerial.begin(9600); // Baud plus lent pour la communication serial avec l'Arduino qui sert de beacon 

    Serial.println(" ");    // Lignes pour séparer le gibberish de la connexion
    Serial.println(" "); 
    Serial.println("[=== Expérimentation port-e, (C) CQEN 2023 ===]");
    Serial.println("[=== Port-E-Daemon, v1.0 ===]");
    Serial.println("[=== Deployé NodeMCU 1.0 ===]");
    Serial.println("[WIFI] Setup de l'application..."); 

    // -----------------------------
    // Configurer les pins utilisés
    // -----------------------------
    pinMode(pinRelay, OUTPUT); 
    pinMode(pinLed, OUTPUT);
    pinMode(pinBuzzer, OUTPUT); 
    digitalWrite(pinRelay, HIGH);
    digitalWrite(pinLed, LOW);
    digitalWrite(pinBuzzer, LOW); 
    
    setupWifi();

    // -----------------------------
    // Configuration de l'état: 
    // au demarrage, l'addresse est non disponible pour forcer l'acquisition d'une 
    // nouvelle demande de preuve. 
    // -----------------------------
    etatAdresse = ADDRESS_NON_DISP; 
    
    serialFlush();
}

/**
 * La fonction setupWifi() est appelée par setup() pour configurer la 
 * communication WiFi de NodeMCU. 
 */
void setupWifi(){
    Serial.println("[WIFI]  Setup WIFI");

    // -----------------------------
    // Configuration du WiFi 
    // -----------------------------

    // Connecter au WiFi
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);

    // Tentative de connection au réseau Wifi:
    Serial.print("\n[WIFI] En train de se connecter au Wifi: ");
    Serial.print("[WIFI] ");
    Serial.println(ssid); 
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(DELAY_S);
    }
    Serial.println("[WIFI] ");
    Serial.println("[WIFI] WiFi connecté");
    Serial.println("[WIFI] Address IP: ");
    IPAddress ip = WiFi.localIP();
    Serial.print("[WIFI] ");
    Serial.println(ip);
    
    // Initialise le web server local
    server.begin();
    
    // Si vous n'avez pas besoin de checker le fingerprint
    client.setInsecure();

    // Si vous voulez checker le fingerprint
    // client.setFingerprint(HOST_FINGERPRINT);
    // client = server.available();
}

/**
 * Après exécuter la fonction setup(), qui initialise et attribue les valeurs 
 * initiales, la fonction loop() fait exactement ce que son nom suggère, et 
 * fait des loops consécutifs, permettant le sketch à répondre aux changements
 * d'environnement d'exécution.
 * Cette fonction est utilisée pour controller activement la plaquette Arduino.
 */
void loop(){
   
    clientWeb = server.available();
    if(clientWeb){
        Serial.println("[WIFI] Nouveau client connecté"); 

        // Attendre requête du client
        while(clientWeb.connected()){
            if(clientWeb.available()){
                // Lire requête du client
                String request = clientWeb.readStringUntil('\r');
                clientWeb.flush(); 
                Serial.println(request);

                // Vérifier si la requête est un GET
                if (request.indexOf("GET") != -1) {

                    // Vérifier si la requete a un endpoint specifique, par exemple "/acces"
                    if (request.indexOf("/acces") != -1) {
                        acces();
                        sendResponse(clientWeb, 200, "OK"); // Envoyer réponse au client, HTTP 200 et accès permis
                    } else if (request.indexOf("/refus") != -1) {
                        refus();
                        sendResponse(clientWeb, 200, "OK"); // Envoyer réponse au client, HTTP 200 et accès refusé
                    } else {
                        // Chemin non connu
                        Serial.println("[WIFI] Oups, problemas em vista"); 
                        sendResponse(clientWeb, 404, "Not Found"); // Envoyer réponse au client, HTTP 404 et not found
                    }
                }
                Serial.println("[WIFI] Fin de la methode acces");
                // Fermer connexion avec le client
                clientWeb.stop();
                Serial.println("[WIFI] Client deconecté");
            }
        }  
    }
    
    // Vérifier si la porte serial a de données reçues dans le buffer d'entrée; si oui, vérifier le type de signal
    // et agir en conséquence. 
    // Sig 0x20: démande de génération d'une nouvelle addresse;
    if(porteSerial.available() > 0){
        String msg = porteSerial.readStringUntil('\n');

        // Si le message reçu est 0x20 (générer nouveau) on génére l'addresse. 
        // Sinon, on continue le loop.
        Serial.print("[WIFI] Signal reçu: ");
        Serial.println(msg);
        if(msg == SIG_GEN){
            Serial.println("[WIFI] Adresse non disponible. Requisition d'un nouvel adresse en cours..."); 
            String adresse = generer();
            serialComm(adresse); 
            delay(DELAY_L);
        } else {
            Serial.println("[WIFI] Pas le signal correct."); 
        }
    }
    delay(DELAY_S);
}

/**
 * Fait la génération d'un nouveau adresse de connection
 */
String generer(){
    // Ouvre la connexion avec le serveur (utiliser porte 80 [HTTPS_PORT] si HTTP)
    if (!client.connect(HOST_ADDRESS, HTTPS_PORT)){
        Serial.println(F("[WIFI] Connexion non réussie"));
        return "";
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

    if (client.println() == 0){
        Serial.println(F("[WIFI] L'envoi de la requête n'est pas réussie"));
        return "";
    }

    // Check HTTP status
    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));

    // Saute les HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders)){
        Serial.println(F("[WIFI] Réponse invalide"));
        return "";
    }

    // Les APIs qui répondent avec HTTP/1.1, on doit enlever les données
    // peek() va lire le character, mais ne vas pas l'enlever de la queue
    String address = ""; 
    while (client.available() && client.peek() != '{' && client.peek() != '['){
        char c = 0;
        client.readBytes(&c, 1);
        address += c; 
    }

    // Atribue l'état disponible pour l'adresse
    etatAdresse = ADDRESS_DISP; 

    // Lorsque le client sera disponible, on lira chaque byte encore disponible
    // et on l'imprimera dans le serial monitor
    while (client.available()){
        char c = 0;
        client.readBytes(&c, 1);
        Serial.print(c);
    }
    return address;
}

/**
 * Envoye les données via SerialComms UART à l'Arduino qui sert de beacon. 
 */
void serialComm(String adresse){
    Serial.print("[WIFI] Adresse généré et lu: ");
    Serial.println(adresse); 
    porteSerial.write(adresse.c_str());
    Serial.println("[WIFI] Envoyé via SerialComms UART");
}

/**
 * Fait le flush des données qui peuvent être dans le buffer de la porte serial. 
 */
void serialFlush(){
    while(porteSerial.available() > 0) {
        char t = porteSerial.read();
    }
}

/**
 * Envoye la réponse HTTP au service de vérification d'accès.  
 */
void sendResponse(WiFiClient client, int statusCode, const char* message) {
    // Envoyer ligne  de status HTTP
    client.println("HTTP/1.1 " + String(statusCode) + " OK");
    // Envoyer header de contenu
    client.println("Content-Type: text/plain");
    // Envoyer ligne blanche pour signifier la fin du header
    client.println();
    // Envoyer le message en réponse
    client.println(message);
}

/**
 * Ouvre la porte, selon les accès autorisés par l'identité numéerique. 
 * Normally Open configuration envoye un signal LOW pour faire le courant passer 
 * (si l'on utilise Normally Closed configuration, le signal HIGH est envoyé)
 */
void acces(){
    printHeaderAccess("Accès autorisé. Bienvenu.");
    digitalWrite(pinRelay, LOW); 
    tone(pinBuzzer, 400); 
    delay(5000); 
    noTone(pinBuzzer);
    digitalWrite(pinRelay, HIGH);   
}

/**
 * Refuse l'acces 
 * Configuration "Normally Open configuration" envoyer le signal HIGH pour arreter le current 
 *  (si l'on use Normally close, envoye le signal LOW).
 */
void refus(){
    printHeaderAccess("Accès refusé.");
    tone(pinBuzzer, 300); 
    delay(2000); 
    noTone(pinBuzzer);
    delay(500); 
    noTone(pinBuzzer);
}

/**
 * Methode utilitaire pour imprimer l'entête de résultat d'évaluation d'accès. 
 */
void printHeaderAccess(String msg){
    Serial.println("[WIFI] ");
    Serial.println("[WIFI] ");
    Serial.print("[WIFI] ");
    Serial.println(msg);
    Serial.println("[WIFI] ");
    Serial.println("[WIFI] ");
}
