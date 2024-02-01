import { HttpService } from '@nestjs/axios';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { AttestationEmiseService } from 'src/attestation-emise/attestation-emise.service';
import { AttestationEmise } from 'src/attestation-emise/entities/attestation-emise.entity';
import { Personne } from 'src/personne/entities/personne.entity';
import { PersonneService } from 'src/personne/personne.service';
import { WebHookNotifier } from './webhook-notifier';

@Controller('webhooks')
export class WebHookController {

    private webhookNotifier: WebHookNotifier;

    constructor(httpService: HttpService, 
                private readonly attestationEmiseService: AttestationEmiseService,
                private readonly personneService: PersonneService) { 
        this.webhookNotifier = new WebHookNotifier(httpService, process.env.WEBHOOK_URL, true);
    }

    @Post(`topic/:topic`)
    async create(@Param('topic') topic, @Body() payload: any) {
        console.log('handle webhook');
        console.log('topic: ' + topic);
        console.log('payload: ' + JSON.stringify(payload));
        let skipNotification = false;
        if (this.isCredentialIssuance(topic) && this.isVirtualAccessRights(payload) && this.isCredentialIssued(payload)) {

            console.log('Ajouter nouvelle attestation dans le backend');
            const nouvelleAttestationEmise = this.buildAttestationEmise(payload);

            let personne = await this.personneService.findByEmail(nouvelleAttestationEmise.email);

            if (!personne) {
                personne = new Personne();
                personne.courriel = nouvelleAttestationEmise.email;
                personne = await this.personneService.save(personne);
            }

            let attestationEmise = await this.attestationEmiseService.findByEmail(nouvelleAttestationEmise.email);
            if (!attestationEmise) {
                await this.delay(500);
                attestationEmise = await this.attestationEmiseService.findByEmail(nouvelleAttestationEmise.email);
            }
            if (attestationEmise) {
                console.log('Attestation déjà présente');
                skipNotification = true;
                attestationEmise.time = nouvelleAttestationEmise.time;
                attestationEmise.connectionId = nouvelleAttestationEmise.connectionId;
                attestationEmise.credentialExchangeId = nouvelleAttestationEmise.credentialExchangeId;
                attestationEmise.threadId = nouvelleAttestationEmise.threadId;
                attestationEmise.revoked = false;
                await this.attestationEmiseService.update(attestationEmise.id, attestationEmise);
            } else {
                nouvelleAttestationEmise.personneId = personne.id;
                attestationEmise = await this.attestationEmiseService.create(nouvelleAttestationEmise);
            }
       }
       console.log('Skip Notification: ' + skipNotification);
       if (!skipNotification) await this.webhookNotifier.notify(topic, payload);
    }

    private isCredentialIssuance(topic: string): boolean {
        return topic === 'issue_credential';
    }

    private isVirtualAccessRights(payload: any): boolean {
        return payload.schema_id.indexOf('CQENDroitAccesVirtuel') > 0;
    }

    private isCredentialIssued(payload: any): boolean {
        return payload.state === 'credential_issued';
    }
    
    private buildAttestationEmise(payload: any): AttestationEmise {
        
        const attestationEmise = new AttestationEmise();
        
        attestationEmise.email = payload.credential_offer_dict.credential_preview.attributes.find(attr => attr.name === 'email').value;
        attestationEmise.time = new Date(payload.credential_offer_dict.credential_preview.attributes.find(attr => attr.name === 'time').value);
        attestationEmise.connectionId = payload.connection_id;
        attestationEmise.credentialExchangeId = payload.credential_exchange_id;
        attestationEmise.threadId = payload.thread_id;

        if (attestationEmise.email) attestationEmise.email.trim();

        return attestationEmise;
    }

    private delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
