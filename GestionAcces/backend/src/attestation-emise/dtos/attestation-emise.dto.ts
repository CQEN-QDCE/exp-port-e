import { AttestationEmise } from "../entities/attestation-emise.entity";

export class AttestationEmiseDto {
    
    courriel: string; 
    personneId: number; 
    email: string; 
    time: Date; 
    revoked: boolean;

    constructor() {
    }

    static fromEntity(entity: AttestationEmise): AttestationEmiseDto {
        if (!entity) return null;
        const dto = new AttestationEmiseDto();
        dto.courriel = entity.courriel;
        dto.personneId = entity.personneId;
        dto.email = entity.email;
        dto.time = entity.time;
        dto.revoked = entity.revoked;
        return dto;
    }
}
