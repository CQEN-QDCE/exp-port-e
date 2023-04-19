import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RessPhysique {

    @PrimaryGeneratedColumn()
    codeRessPhysique: number; 

    @Column({length: 32})
    localisation: string;

    @Column({length: 1})
    alias: string; 
}
