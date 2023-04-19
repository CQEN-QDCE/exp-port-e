import { Personne } from "../entities/personne.entity";

export class PersonneDto {

    id: number;
    courriel: string;  
    nom: string; 
    prenom: string;
    direction: string; 
    poste: string; 
    dateCreation: Date; 
    dateMaj: Date; 
    version: number; 

    constructor() {
    }

    static fromEntity(entity: Personne): PersonneDto {
        if (!entity) return null;
        const dto = new PersonneDto();
        dto.id = entity.id;
        dto.courriel = entity.courriel;
        dto.prenom = entity.prenom;
        dto.nom = entity.nom;
        dto.direction = entity.direction;
        dto.poste = entity.poste;
        dto.dateCreation = entity.dateCreation;
        dto.dateMaj = entity.dateMaj;
        dto.version = entity.version;
        return dto;
    }

    static toEntity(dto: PersonneDto): Personne {
        if (!dto) return null;
        const personne = new Personne();
        personne.id = dto.id;
        personne.courriel = dto.courriel;
        personne.prenom = dto.prenom;
        personne.nom = dto.nom;
        personne.direction = dto.direction;
        personne.poste = dto.poste;
        personne.dateCreation = dto.dateCreation;
        personne.dateMaj = dto.dateMaj;
        personne.version = dto.version;
        return personne;
    }
}
