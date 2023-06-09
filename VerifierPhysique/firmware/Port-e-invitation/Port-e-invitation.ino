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

// Clients HTTPS
WiFiClientSecure client;      // Client comms securitaire avec openshift
WiFiClient       clientWeb;   // Client du web server

// Set web server port number to 80
WiFiServer server(80);

// État de l'adresse: 
//    si l'adresse n'existe pas ou est utilisé, son état est 0
//    sinon, si l'adresse est généré et pas encore consommé, son état est 1 
int etatAdresse;


// Créé une porte serial virtuale aux pins digitaux 6(RX) et 7(TX)
// Dans le cas de NodeMCU, TX=GPIO5=D1; RX=GPIO4=D2
// Alors, connecter le pin D2 à RX, et D1 à TX; dans le code, référencer par les # gpio (4, 5)
SoftwareSerial porteSerial(4, 5);

// Connecté au pin D4, alors gpio #2
int pinRelay = 2; 

/**
 * 
 */
void setup(){
    //delay(3000);   // Serait il necessaire? 
    
    Serial.begin(115200);    // Baud plus vite pour l'application
    porteSerial.begin(9600); // Baud plus lent pour la communication serial 

    Serial.println("[WIFI] Setup de l'application..."); 

    // configure le pin du relay pour faire sortie
    pinMode(pinRelay, OUTPUT); 
    digitalWrite(pinRelay, HIGH);

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

    // Sinon si vous voulez checker le fingerprint
    // client.setFingerprint(HOST_FINGERPRINT);
}

/**
 * 
 */
void loop(){
    
    Serial.println("[WIFI] Loop... ");

    
    clientWeb = server.available();
    if(clientWeb){
        Serial.println("Nouveau client connecté"); 

        // Attendre requete du client
        while(clientWeb.connected()){
          if(clientWeb.available()){
            // Lire requete du client
            String request = clientWeb.readStringUntil('\r');
            clientWeb.flush(); 
            Serial.println(request);

            // Verificar se a solicitação é um GET
        if (request.indexOf("GET") != -1) {
          Serial.println("C");
          // Verificar se a solicitação contém um caminho específico, por exemplo, "/ligar"
          if (request.indexOf("/acces") != -1) {
            Serial.println("D");
            // Ativar o pino 12
            digitalWrite(12, HIGH); 
            Serial.println("Appel a la fonction d'acces autorisé");
            acces();
            sendResponse(clientWeb, 200, "OK"); // Enviar resposta para o cliente
          } else if (request.indexOf("/refus") != -1) {
            Serial.println("E");
            // Desativar o pino 12
            digitalWrite(12, LOW);
            refus();
            sendResponse(clientWeb, 200, "OK"); // Enviar resposta para o cliente
          } else {
            // Caminho desconhecido
            Serial.println("F");
            Serial.println("Oups, problemas em vista"); 
            sendResponse(clientWeb, 404, "Not Found"); // Enviar resposta para o cliente
          }
        }
        // Encerrar a conexão com o cliente
        clientWeb.stop();
        Serial.println("Cliente desconectado");
            }
          }  
        }
    
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
    delay(DELAY_S);     // réconsiderer le delay ici. 
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


void sendResponse(WiFiClient client, int statusCode, const char* message) {
  // Enviar linha de status HTTP
  client.println("HTTP/1.1 " + String(statusCode) + " OK");
  // Enviar cabeçalho de conteúdo
  client.println("Content-Type: text/plain");
  // Enviar linha em branco para indicar o fim do cabeçalho
  client.println();
  // Enviar a mensagem de resposta
  client.println(message);
}

/**
 * Ouvre la porte, selon les accès autorisés par l'identité numéerique. 
 * // Normally Open configuration, send LOW signal to let current flow
  // (if you're usong Normally Closed configuration send HIGH signal)
 */
void acces(){
  Serial.println("Accès autorisé. Welcome in...");
  digitalWrite(pinRelay, LOW); 
  delay(5000); 
  digitalWrite(pinRelay, HIGH);   
  Serial.println("Fin de la methode acces");
}

/**
 * Refuse l'acces 
 *   // Normally Open configuration, send HIGH signal stop current flow
  // (if you're usong Normally Closed configuration send LOW signal)
 */
void refus(){
  Serial.println("Accès refusé. Go away...");

  /*digitalWrite(pin, HIGH); 
  delay(5000); 
  digitalWrite(pinLed, LOW); */
}
