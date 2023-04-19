import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AccesPhysique {

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
