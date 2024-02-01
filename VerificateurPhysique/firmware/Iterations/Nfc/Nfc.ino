/*
    Un projet d'exemple pour faire du broadcast de tag NDEF via carte NFC PN532. 

    https://github.com/witnessmenow/arduino-sample-api-request/blob/master/ESP8266/HTTP_GET/HTTP_GET.ino

*/

// ----------------------------
// Standard Libraries
// ----------------------------

#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"


// -----------------------------
// Fichiers header personnalisés
// -----------------------------

#include "emulatetag.h"
#include "NdefMessage.h"
#include "thingProperties.h"


// -----------------------------
// Variables globales 
// -----------------------------

// Objets de la librairie PN532
PN532_SPI pn532spi(SPI, 10);
EmulateTag nfc(pn532spi);

// Objets de la librairie NDEF
uint8_t ndefBuf[BUFFER_SIZE];
NdefMessage message;
int messageSize;

// Identificateur du tag. Doit avoir 3 bytes de long - valeur fixe
  uint8_t uid[3] = { 0xCA, 0xFE, 0x10 };

/**
 *
 */
void setup(){

    Serial.begin(115200);
    Serial.println("------- Emulation de Tag --------");

    // -----------------------------
    // Configuration de la carte NFC 
    // -----------------------------    
    message = NdefMessage();
    message.addUriRecord(didcommInvite); 
    messageSize = message.getEncodedSize();
    if (messageSize > sizeof(ndefBuf)) {
        Serial.println("ndefBuf est trop petit");
        while (1) { }
    }

    Serial.print("Taille du message Ndef codifié: ");
    Serial.println(messageSize);

    message.encode(ndefBuf);

    // commenter la command si l'on ne veut pas du ndef message
    nfc.setNdefFile(ndefBuf, messageSize);
    
    // uid doit avoir 3 bytes!
    nfc.setUid(uid);
    
    nfc.init();
    Serial.println(nfc.init());

}

/**
 *
 */
void loop(){

}

/**
 * Fait le broadcast de la tag NDEF de l'URL du site qui sera ouvert par le dispositif mobile. 
 */
void broadcastTag(){
    // décommenter pour faire du overriding ndef au cas d'une écriture déjà faite
    //nfc.setNdefFile(ndefBuf, messageSize); 

    // débute emulation (blocks)
    nfc.emulate();
        
    // ou start emulation avec du timeout
    /*if(!nfc.emulate(1000)){ // timeout 1 second
        Serial.println("timed out");
    }*/

    // empêcher écriture du tag
    // nfc.setTagWriteable(false);

    if(nfc.writeOccured()){
        Serial.println("\nSuccès de broadcast!");
        uint8_t* tag_buf;
        uint16_t length;
        
        nfc.getContent(&tag_buf, &length);
        NdefMessage msg = NdefMessage(tag_buf, length);
        msg.print();
    }
}
