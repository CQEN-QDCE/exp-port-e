#ifndef config_h
#define config_h

// Pins module wifi 
#define WIFI_RX_PIN   2
#define WIFI_TX_PIN   3

// Pin relay
#define RELAY_PIN 4

// Pin buzzer 
#define BUZZ_PIN  5

// Pins du LED RGB
#define RED_PIN   6
#define GREEN_PIN 7
#define BLUE_PIN  8

/**
 * Pins reader RC522. 
 * Pin IRQ n'est pas connecté; VCC est connecté à 3.3V
 */
#define SDA_PIN   10
#define SCK_PIN   13
#define MOSI_PIN  11
#define MISO_PIN  12
#define RST_PIN   9

#endif