import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn,  } from "typeorm";

@Entity()
export class Personne {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64})
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
