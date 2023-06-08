import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AccesPhysique {

    @PrimaryColumn({length: 64})
    courriel: string;
    
    @PrimaryGeneratedColumn()
    codeRessPhysique: number; 

    @Column({length: 1})
    status: string;

    @CreateDateColumn()
    dateCreation: Date; 

    @UpdateDateColumn()
    dateModification: Date;

}
