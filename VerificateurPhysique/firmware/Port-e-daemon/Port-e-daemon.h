/*
 * Invitation.h - librairie pour générer des demandes de preuve
 * et les broadcaster via NFC. 
 * Copyright (c) 2023 Gouvernement du Québec
 * Auteur: Julio Cesar Torres (torj01)
 * SPDX-License-Identifier: LiLiQ-R-v.1.1
 * License-Filename: /LICENSE
 */

#ifndef Port_e_invitation_h
#define Port_e_invitation_h

#include "Arduino.h"

class Invitation {

    public: 
        void setup();
        void setupWifi(); 
        void setupNfc(); 
        void loop(); 
        String requeteHttp(); 
        void emulateNFC(String adresse); 
};

#endif
