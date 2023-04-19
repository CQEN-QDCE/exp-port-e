import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RessVirtuelle {

    @PrimaryGeneratedColumn()
    codeRessVirtuelle: number; 

    @Column({length: 64})
    urlBaseRessource: string; 

}
