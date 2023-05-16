<!-- ENTETE -->
[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

---

<div>
    <a target="_blank" href="https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique">
      <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" alt="Logo du Ministère de la cybersécurité et du numérique" />
    </a>
</div>
<!-- FIN ENTETE -->

# Firmware invitation

## Bill of Materials 

### NodeMCU - unité microcontrollée intégrée au Wireless 

**Pinout NodeMCU** 
<div align="center">
    <img src="./assets/images/NodeMCUPinout.jpg" alt="Pinout du module NodeMCU" width="600"/>
</div>

PN532 - module lecture / broadcast de NFC

## SPI Protocol 

VCC: Module power supply 3-5V

GND: Ground 

SCK: Serial Clock pin 

MISO: Output data pin (Master Input Slave Output)

MOSI: Input data pin  (Master Output Slave Input)

SS: Slave select 

IRQ: Interrupt Signal pin 

RSTO: Reset pin

**Pinnout NodeMCU et Arduino**

|PIN  |Arduino|NodeMCU|
|-----|-------|-------|
|SCK  |D13    |D5     |
|MISO |D12    |D6     |
|MOSI |D11    |D7     |
|SS   |D10    |D8     |
|VCC  |5V     |3.3V   |
|GND  |GND    |GND    |
|IRQ  |N/C    |N/C    |
|RSTO |D9     |N/C    |

## Datasheets 

[PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf)

[NodeMCU - AI-Thinker](https://docs.ai-thinker.com/_media/esp32/docs/nodemcu-32s_product_specification.pdf)


## Notes

Pour que la connexion entre le module NodeMCU et le module PN532 fonctionne correctement, il faut faire un pull down du pin connecté au Chip Select (SS) du SPI. Pour ce faire, simplement faites une liaison entre le pin SS et le pin GND du module NodeMCU. Si l'on ne fait pas cette liaison, les modules ne marcheront pas du tout ensemble, il ne sera même pas possible de faire l'upload su sketch au micro-contrôleur. 


## Acknowledgements

Ce projet est basé sur d'autres projets

- Wifi 
- NFC 
- NDEF 

## Références 

[Description du pinout du module NodeMCU](https://esp8266-shop.com/esp8266-guide/esp8266-nodemcu-pinout/)

