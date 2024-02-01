/*
 * Le beacon est responsable de faire le broadcast du signal NFC via PN532 en 
 * mode émulation. 
 * Deployé sur NodeMCU. 
 * 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torjc01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

// ----------------------------
// Standard Libraries
// ----------------------------

// NFC
#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"

// Software Serial
#include <SoftwareSerial.h>

// -----------------------------
// Fichiers header personnalisés
// -----------------------------
#include "thingProperties.h"

// Header  NFC 
#include "emulatetag.h"
#include "NdefMessage.h"

// -----------------------------
// Variables globales 
// -----------------------------

// Objets de la librairie PN532
PN532_SPI pn532spi(SPI, SPI_SS_PIN);
EmulateTag nfc(pn532spi);

// Objets de la librairie NDEF
uint8_t ndefBuf[NFC_BUFFER_SIZE];
NdefMessage message;
uint8_t messageSize;

// Identificateur du tag. Doit avoir 3 bytes de long
uint8_t uid[3] = { 0x12, 0x34, 0x56 };

// Objet de la librairie SoftwareSerial
SoftwareSerial porteSerial(RX_PIN, TX_PIN);  // Cria uma porta serial virtual nos pinos digitais 6 (RX) e 7 (TX)

// Variable qui fait track de l'état de l'adresse de l'application
uint8_t etatAdresse; 

/**
 * La fonction setup() est apellée lorsqu'un sketch démarre. Utilisez-la pour 
 * initialiser les variables, pin modes, démarrer l'utilisation des librairies, etc. 
 * Cette fonction est exécutée une seule fois, après le démarrage ou reset de la plaque Arduino. 
 */
void setup(){
    Serial.begin(115200); 
    porteSerial.begin(9600);
    Serial.println(" ");
    Serial.println("[=== Expérimentation port-e, (C) CQEN 2023 ===]");
    Serial.println("[=== Port-E-Beacon, v1.0 ===]");
    Serial.println("[=== Deployé sur Arduino Uno Rev3 ===]");
    Serial.println("[NFC] Setup de l'application..."); 

    etatAdresse = ADDRESS_NON_DISP;
}

/**
 * Après exécuter la fonction setup(), qui initialise et attribue les valeurs 
 * initiales, la fonction loop() fait exactement ce que son nom suggère, et 
 * fait des loops consécutifs, permettant le sketch à répondre aux changements
 * d'environnement d'exécution.
 * Cette fonction est utilisée pour controller activement la plaquette Arduino.
 */
void loop(){
    if(etatAdresse == ADDRESS_NON_DISP){
        Serial.println("[NFC] Adresse non dispo. Demander génération...");
        broadcast(genererAdresse());
    }
    delay(DELAY_M);
}

/**
 * Génére l'adresse de connexion. La demande de génération est faite au firmware
 * Port-e-daemon, via une écriture dans la porte seriale respective. Au signal 
 * SIG_GEN, le daemon va générer une adresse et retransmettre via serial comms 
 * la nouvelle adresse.   
 */
String genererAdresse(){
    Serial.println("[NFC] Génération de l'adresse en cours...");
    porteSerial.write(SIG_GEN);

    String addr = "";
    delay(DELAY_L + DELAY_M); 

    if(porteSerial.available() > 0){
        addr = porteSerial.readStringUntil('\n');
        Serial.print("[NFC] Addr généré: "); 
        Serial.println(addr);
    }else {
        Serial.println("[NFC] Pas de temps disponible pour recevoir...");
    }
    etatAdresse = ADDRESS_DISP; 
    return addr;
}

/**
 * Reçoit l'adresse à broadcaster; créé un message NDEF, puis fais l'émulation
 * et le broadcast. Noter que le programme restera bloqué jusqu'à ce qu'un 
 * usager fasse une lecture avec un dispositif mobile.  
 */
void broadcast(String param){
    Serial.println("[NFC] Broadcasting l'adresse");
    Serial.print("[NFC] Parameter: ");
    Serial.println(param.c_str()); 
    Serial.print("Length: ");
    Serial.println(param.length());
    
    message = NdefMessage(); 
    message.addUriRecord(param);
    messageSize = message.getEncodedSize();
    
    if (messageSize > sizeof(ndefBuf)) {
        Serial.println("[NFC] ndefBuf est trop petit");
        while (1) { }
    }
    
    message.encode(ndefBuf); 

    // commenter la command si l'on ne veut pas du ndef message
    nfc.setNdefFile(ndefBuf, messageSize);
    nfc.setUid(uid); // uid doit avoir 3 bytes!
    nfc.init();
    nfc.emulate(); // start emulation (blocks l'exécution du loop du firmware)
    
    if(nfc.writeOccured()){
        
        Serial.println("[NFC] \nWrite occured !"); 
        uint8_t* tag_buf; uint16_t length;
        nfc.getContent(&tag_buf, &length);
        NdefMessage msg = NdefMessage(tag_buf, length);
        msg.print();
    }
    Serial.println("[NFC] Message livré au telephone");
    delay(DELAY_S);
    etatAdresse = ADDRESS_NON_DISP;
}

/**
 * Fait la nettoyage du buffer de la porte de communication seriale. 
 */
void serialFlush(){

    while(porteSerial.available() > 0) {
        char t = porteSerial.read();
    }
}

/**
 * TODO: Ajouter instructions pour reseter le programme à l'état initiale. 
 */
void reset(){

}
