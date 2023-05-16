#include "emulatetag.h"
#include "NdefMessage.h"

#include <SPI.h>
#include <PN532_SPI.h>
#include "PN532.h"

PN532_SPI pn532spi(SPI, 10);
EmulateTag nfc(pn532spi);

uint8_t ndefBuf[512];
NdefMessage message;
int messageSize;

// Identificateur du tag. Doit avoir 3 bytes de long
  uint8_t uid[3] = { 0x12, 0x34, 0x56 };

void setup(){
  Serial.begin(115200);
  Serial.println("------- Emulation de Tag --------");
  
/*  
  didcomm://invite?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3B
  lYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiZTU0OWQ5YjUtNDZhZi00YTIxLWI
  4NWMtMDQyYzJmMzQ4NGM3IiwgImxhYmVsIjogIlNlcnZpY2UgZGUgdlx1MDBlOXJpZmljYXRpb24gZGU
  gY291cnJpZWwgZHUgQ1FFTiIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cHM6Ly9leHAtcG9ydC1lLXY
  2LmFwcHMuZXhwLm9wZW5zaGlmdC5jcWVuLmNhIiwgInJlY2lwaWVudEtleXMiOiBbIkRvcVZKNlVlWEx
  CNUFTd0pUY3dUMWFZdW9tYkt0MTFqWnJrdXVNSlRvSnZQIl19
*/

  String didcommInvite = "didcomm://invite?https://exp-port-e-url-courte.apps.exp.openshift.cqen.ca/hJtiA7NO";
  // String didcommInvite = "didcomm://invite?https://exp-port-e-raccourci.apps.exp.openshift.cqen.ca/SUXn4MHF"; 
  // String didcommInvite = "didcomm://invite?https://www.shortnsweet.link/LqabVuS4";
  message = NdefMessage();
  message.addUriRecord(didcommInvite); 
  messageSize = message.getEncodedSize();
  if (messageSize > sizeof(ndefBuf)) {
      Serial.println("ndefBuf est trop petit");
      while (1) {}
  }
  
  Serial.print("Taille du message Ndef codifié: ");
  Serial.println(messageSize);

  message.encode(ndefBuf);
  
  // commenter la command si l'on ne veut pas du ndef message
  nfc.setNdefFile(ndefBuf, messageSize);
  
  // uid doit avoir 3 bytes!
  nfc.setUid(uid);
  //Serial.println(message);
  nfc.init();
  
  Serial.println(nfc.init());
  Serial.println(true);
}

void loop(){
    // decommenter pour overriding ndef au cas une ecriture est deja faite
    // nfc.setNdefFile(ndefBuf, messageSize); 
    
    // start emulation (blocks)
    nfc.emulate();
        
    // ou start emulation avec du timeout
    /*if(!nfc.emulate(1000)){ // timeout 1 second
      Serial.println("timed out");
    }*/
    
    // empecher ecriture du tag
    // nfc.setTagWriteable(false);
    
    if(nfc.writeOccured()){
       Serial.println("\nWrite occured !");
       uint8_t* tag_buf;
       uint16_t length;
       
       nfc.getContent(&tag_buf, &length);
       NdefMessage msg = NdefMessage(tag_buf, length);
       msg.print();
    }
    delay(1000);
}
