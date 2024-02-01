# Émulation de carte NFC

Projet de base pour émuler une carte NFC. 

## Compilation

Pour réussir la compilation, il faut faire le télechargement des librairies PN532 d'Elechouse et 
NDEF, de Don Coleman. 

Il faut copier, vers le répertoire local, les fichiers `emulatetag.h`, `NdefMessage.h`, `PN532.h`, `PN532Interface.h` et les changer selon les consignes ci-dessous (entre parantheses, le projet d'origine du fichier copié).  


```
<arduino_home>/
    |---- libraries/
        |---- NDEF
        |---- PN532
        |---- PN532_HSU
        |---- PN532_I2C
        |---- PN532_SPI 
        |---- PN532_SWHSU
    |---- Port-e-Emulation 
        |---- emulatetag.h (PN532)
        |---- NdefMessage.h (NDEF)
        |---- PN532.h (PN532)
        |---- PN532Interface.h (PN532)
        |---- Port-e-Emulation.ino

```



## Librairies utilisées


NFC library for Arduino  - https://github.com/elechouse/PN532

NDEF library for Arduino - https://github.com/don/NDEF/blob/master/library.properties