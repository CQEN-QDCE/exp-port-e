/*
 * 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torj01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

// ----------------------------
// Standard Libraries
// ----------------------------
#include "Invitation.h"

//  Wifi Libs
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

// NFC Libs
#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"


// -----------------------------
// Fichiers header personnalisés
// -----------------------------
#include "arduino_secrets.h"
#include "thingProperties.h"

// Header  NFC 
#include "emulatetag.h"
#include "NdefMessage.h"

// -----------------------------
// Variables globales 
// -----------------------------

// Client HTTPS
WiFiClientSecure client;

// État de l'adresse: 
//    si l'adresse n'existe pas ou est utilisé, son état est 0
//    sinon, si l'adresse est généré et pas encore consommé, son état est 1 
int etatAdresse;

// Objets de la librairie PN532
PN532_SPI pn532spi(SPI, 10);
EmulateTag nfc(pn532spi);

// Objets de la librairie NDEF
uint8_t ndefBuf[NFC_BUFFER_SIZE];
NdefMessage message;
int messageSize;

// Identificateur du tag. Doit avoir 3 bytes de long - valeur fixe
  uint8_t uid[3] = { 0xCA, 0xFE, 0x10 };


/**
 * 
 */
void setup(){
    Serial.begin(115200);

    // Configuration du wifi
    setupWifi(); 

    // Configuration du NFC 
    setupNfc(); 
}

/**
 * 
 */
void setupWifi(){

    Serial.println("[NFC]  Setup NFC");

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
        delay(500);
    }
    Serial.println("[WIFI] ");
    Serial.println("[WIFI] WiFi connecté");
    Serial.println("[WIFI] Address IP: ");
    IPAddress ip = WiFi.localIP();
    Serial.print("[WIFI] ");
    Serial.println(ip);

    // Si vous n'avez pas besoin de checker le fingerprint
    // client.setInsecure();

    // Si vous voulez checker le fingerprint
    client.setFingerprint(HOST_FINGERPRINT);

    // -----------------------------
    // Configuration de l'état: 
    // au demarrage, l'addresse est non 
    // disponible pour forcer l'acquisition
    // d'une nouvelle demande de preuve
    // -----------------------------
    etatAdresse = ADDRESS_NON_DISP; 

}

/**
 * 
 */
void setupNfc(){
 
    Serial.println("[NFC]  Setup NFC");
    
    // uid doit avoir 3 bytes!
    nfc.setUid(uid);
    
    nfc.init();
    Serial.println(nfc.init());

}

/**
 * 
 */
void loop(){
    // Les instructions du loop sont inscrits ici

    // Vérifie l'état de l'addresse. Si l'adresse n'est pas disponible, faire appel
    // à la méthode makeHttpRequest() pour créér un novel adresse. 
    if(etatAdresse == ADDRESS_NON_DISP){
      Serial.println("[APP]  Adresse non disponible. Requisition d'un nouvel adresse en cours..."); 
      String adresse = requeteHttp();

      Serial.println("[APP]  Broadcast de l'addresse NFC");
      emulerNfc(adresse); 
    }   
}

/**
 * 
 */
String requeteHttp(){

    // Ouvre la connexion avec le serveur (utiliser porte 80 [HTTPS_PORT] si HTTP)
    if (!client.connect(HOST_ADDRESS, HTTPS_PORT))
    {
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

    if (client.println() == 0)
    {
        Serial.println(F("[WIFI] L'envoi de la requête n'est pas réussie"));
        return "";
    }

    // Check HTTP status
    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));

    // Serial.println("Status: " + status.toString()); 

    // Saute les HTTP headers
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders))
    {
        Serial.println(F("[WIFI] Réponse invalide"));
        return "";
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

    Serial.println("[WIFI] Adresse: " + address);

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
    return address;
}

/**
 * 
 */
void emulerNfc(String adresse){

  // NFC 

    // -----------------------------
    // Configuration de la carte NFC 
    // -----------------------------    
    message = NdefMessage();
    message.addUriRecord(adresse); 
    messageSize = message.getEncodedSize();
    if (messageSize > sizeof(ndefBuf)) {
        Serial.println("[NFC]  ndefBuf est trop petit");
        while (1) { }
    }

    Serial.print("[NFC]  Taille du message Ndef codifié: ");
    Serial.println(messageSize);

    message.encode(ndefBuf);

    // commenter la command si l'on ne veut pas du ndef message
    nfc.setNdefFile(ndefBuf, messageSize);
    

    Serial.println("[NFC] ------- Emulation de Tag NFC --------");
  
    // décommenter pour faire du overriding nedf au cas qu'une écriture soit déjà faite

    // start emulation bloquante(blocks)
    nfc.emulate(); 

    // ou start emulation avec du timeout
    /*
    *if(!nfc.emulate(1000)){
    *  Serial.println("Émulation a tombé en time out");
    *}
    */

    // empêche l'écriture du tag
    // nfc.setTagWritable(false); 

    if(nfc.writeOccured()){
        Serial.println("[NFC]  Écriture NFC faite!");
        uint8_t* tag_buf; 
        uint16_t length; 

        nfc.getContent(&tag_buf, &length); 
        NdefMessage msg = NdefMessage(tag_buf, length); 
        msg.print();

        // Adresse utilisé, alors indisponible. Marque-le pour regeneration lors du
        // prochain cycle de clock
        etatAdresse = ADDRESS_NON_DISP;
    }
    delay(1000); 
}
