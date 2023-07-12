import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, VersionColumn,  } from "typeorm";

@Entity()
export class Personne {

    @PrimaryColumn({length: 64})
    courriel: string;  

    @Column({nullable: true, length: 32})
    nom: string; 

    @Column({nullable: true, length: 32})
    prenom: string;
    
    @Column({nullable: true, length: 32})
    direction: string; 

    @Column({nullable: true, length: 32})
    poste: string; 

    @CreateDateColumn()
    dateCreation: Date; 

    @UpdateDateColumn()
    dateMaj: Date; 

    @VersionColumn()
    version: number; 

}
