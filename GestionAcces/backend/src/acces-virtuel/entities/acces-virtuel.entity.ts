import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class AccesVirtuel {

    @PrimaryGeneratedColumn()
    codePersonne: number;
    
    @PrimaryGeneratedColumn()
    codeRessPhysique: number; 

    @Column({length: 1})
    status: string;

    @CreateDateColumn()
    dateCreation: Date; 

    @UpdateDateColumn()
    dateModification: Date;

}
