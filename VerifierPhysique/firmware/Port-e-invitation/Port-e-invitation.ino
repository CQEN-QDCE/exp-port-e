/*
 * Deployé sur NodeMCU
 * 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torj01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

// ----------------------------
// Standard Libraries
// ----------------------------
#include "Port-e-invitation.h"

//  Wifi Libs
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

// SerialComms Lib 
#include <SoftwareSerial.h>

// CRC32 Lib
#include <CRC32.h>

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

// Créé une porte serial virtuale aux pins digitaux 6(RX) et 7(TX)
// Dans le cas de NodeMCU, TX=GPIO5=D1; RX=GPIO4=D2
// Alors, connecter le pin D2 à RX, et D1 à TX; dans le code, référencer par les # gpio (4, 5)
SoftwareSerial porteSerial(4, 5);

CRC32 crc; 

/**
 * 
 */
void setup(){
    delay(DELAY_M);             // Serait il necessaire? 
    
    Serial.begin(115200);    // Baud plus vite pour l'application
    porteSerial.begin(9600); // Baud plus lent pour la communication serial 

    Serial.println("[WIFI] Setup de l'application..."); 

    // Initialiser le CRC 
    crc.reset();

    setupWifi();

    // -----------------------------
    // Configuration de l'état: 
    // au demarrage, l'addresse est non 
    // disponible pour forcer l'acquisition
    // d'une nouvelle demande de preuve
    // -----------------------------
    etatAdresse = ADDRESS_NON_DISP; 
    
    serialFlush();
}

/**
 * 
 */
void loop(){
    Serial.println("[WIFI] Loop... ");

    if(porteSerial.available() > 0){
        String msg = porteSerial.readStringUntil('\n');

        // Si le message reçu est 0x20 (générer nouveau) on génére l'addresse. 
        // Sinon, on continue le loop.
        Serial.print("[WIFI] Signal reçu: ");
        Serial.println(SIG_GEN);
        if(msg == SIG_GEN){
            Serial.println("[WIFI] Adresse non disponible. Requisition d'un nouvel adresse en cours..."); 
            String adresse = generer();
            serialComm(adresse); 
            delay(DELAY_L);
        } else {
            Serial.println("[WIFI] Pas le signal correct."); 
        }
    }
    delay(DELAY_M);     // réconsiderer le delay ici. 
}

/**
 * 
 */
void setupWifi(){
    Serial.println("[WIFI] Setup WIFI");

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

    // Si vous n'avez pas besoin de checker le fingerprint, décommenter la ligne suivante
    // client.setInsecure();

    // Si vous voulez checker le fingerprint
    client.setFingerprint(HOST_FINGERPRINT);
}

/**
 * 
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

    // Serial.println("Status: " + status.toString()); 

    // Saute les HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders)){
        Serial.println(F("[WIFI] Réponse invalide"));
        return "";
    }

    // Les APIs qui répondent avec HTTP/1.1, on doit enlever les données
    //
    // peek() va lire le character, mais ne vas pas l'enlever de la queue
    String address = ""; 
    while (client.available() && client.peek() != '{' && client.peek() != '['){
        char c = 0;
        client.readBytes(&c, 1);
        address += c; 
    }

    Serial.println("[WIFI] Adresse: " + address);

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
 * Retourne juste la partie de l'indentifiant unique du short-url
 */
void serialComm(String adresse){
    Serial.print("[WIFI] Adresse généré et lu:");
    Serial.println(adresse); 
    Serial.print("[WIFI] À envoyer: "); 
    Serial.println(adresse);
    porteSerial.write(adresse.c_str());
    Serial.println("[WIFI] Envoyé via SerialComms UART");
}

/**
 * 
 */
void serialFlush(){
    while(porteSerial.available() > 0) {
        char t = porteSerial.read();
    }
}
