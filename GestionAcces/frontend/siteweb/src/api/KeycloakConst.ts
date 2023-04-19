import { KeycloakConfig } from "keycloak-js";
import React from "react";

export const keycloakConfig: KeycloakConfig = {
    realm: "master",
    clientId: "swsqin",
    url: "http://0.0.0.0:8080/",

};