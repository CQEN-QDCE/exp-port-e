import React from "react";
import Page from "./PageInterface";
import Keycloak from "keycloak-js";
import { keycloakConfig } from "../api/KeycloakConst";
import { connected } from "process";

export interface IConnexion {
    connected: string;
}
export default class Connexion extends Page<IConnexion>{

    constructor(props: any) {
        super(props);
        this.state = {
            connected: "Redirection ...",
        };
    }

    render() {
        return <h1>{this.state.connected}</h1>
    }
}