/**
 * Expérimentation Mets ta carte!
 * Name: RFID_Locks.ino
 * Purpose: Ouvrir la porte selon la lecture d'une identité numérique presentée via lecteur RFID. 
 * @author Julio Cesar Torres dos Santos <julio.cesartorres@mcn.gouv.qc.ca>
 * @version 1.0 15/09/2022
 */

#include <SPI.h>
#include <MFRC522.h>
#include "arduino_secrets.h"
#include "config.h"

// Constantes du programme

// Constants qui definissent les temps 
const int TEMPO_ABERTURA = 3000;  // La porte reste ouverte pendant 3 seconds
const int TEMPO_ESPERA   = 1000;  // Temps d'attente jusqu'au nouveau cycle. 

// Definition de variables de couleurs
int RED  []  = {255, 0, 0}; // Lumière rouge: alertes d'erreur
int GREEN[]  = {0, 255, 0}; // Lumière verte: porte ouverte, accès franchi
int BLUE []  = {0, 0, 255}; // Lumière bleue: 

// Constantes du wifi 
char *ssid = SSID; 
char *pass = PASS;

// Notes musicales
const int LA4 = 440;

// Créer instance MFRC522.
MFRC522 mfrc522(SDA_PIN, RST_PIN);   

/**
 * 
 */
void setup() {
  
  Serial.begin(115200);     // Démarre la communication seriale
  SPI.begin();              // Démarre SPI bus
  mfrc522.PCD_Init();       // Démarre MFRC522
  pinMode(RED_PIN  , OUTPUT); 
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN , OUTPUT);
  pinMode(BUZZ_PIN , OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  noTone(BUZZ_PIN);
  rgbled(BLUE);
  digitalWrite(RELAY_PIN, LOW);
  Serial.println("\nVeuillez faire la lecture du dispositif...");
  Serial.println();
}

/**
 * 
 */
void loop(){
  
  // Cherche de nouvelle carte 
  if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  
  // Selectionne la carte 
  if ( ! mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  
  // Montre le UID dans le serial monitor
  Serial.print("UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();

  // BB 6C 0E 1B - tag rfid
  // 04 59 4B 4A DD 64 80 - carte 

  
  if (content.substring(1) == "04 59 4B 4A DD 64 80") { // changer ici UID de la carte que aura l'accès
    /* Serial.println("Accès autorisé");
    Serial.println();
    rgbled(GREEN);
    tone(BUZZ_PIN, LA4);
    digitalWrite(RELAY_PIN, HIGH);
    delay(TEMPO_ABERTURA);
    digitalWrite(RELAY_PIN, LOW);
    rgbled(BLUE);
    noTone(BUZZ_PIN); 
    mfrc522.PCD_Init(); */
    open();
  } else {
    forbidden():
  }
}

/**
  Ouvre la porte selon les parametres pré-definis.
  
  @param n/a.
  @return void
*/
void open(){
/*  tone(BUZZ_PIN, LA4);
  rgbled(GREEN);
  digitalWrite(RELAY_PIN, HIGH); */

  Serial.println("Accès autorisé");
  Serial.println();
  rgbled(GREEN);
  tone(BUZZ_PIN, LA4);
  digitalWrite(RELAY_PIN, HIGH);
  delay(TEMPO_ABERTURA);
  digitalWrite(RELAY_PIN, LOW);
  rgbled(BLUE);
  noTone(BUZZ_PIN); 
  mfrc522.PCD_Init();
}

/**
 * 
 */
void forbidden(){
  /*noTone(BUZZ_PIN);
  rgbled(BLUE); 
  digitalWrite(RELAY_PIN, LOW); */

  Serial.println("Accès interdit");
  Serial.println();
  rgbled(RED);
  tone(BUZZ_PIN, 300);
  delay(300); 
  noTone(BUZZ_PIN);
  delay(100); 
  tone(BUZZ_PIN, 300);
  delay(300); 
  noTone(BUZZ_PIN);
  delay(100); 
  tone(BUZZ_PIN, 300);
  delay(TEMPO_ESPERA);
  rgbled(BLUE);
  noTone(BUZZ_PIN);
}

/**
  Allume la lumière LED selon la couleur choisie. 
  
  @param color[] les valeurs qui composent la couleur RGB à être allumée. 
  @return void
*/
void rgbled(int color[]){
  analogWrite(RED_PIN, color[0]); 
  analogWrite(GREEN_PIN, color[1]);
  analogWrite(BLUE_PIN, color[2]);
}