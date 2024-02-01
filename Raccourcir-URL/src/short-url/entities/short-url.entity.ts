import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShortUrl {

    @PrimaryGeneratedColumn() 
    id: number; 

    @Column({length: 2048, default: ""})
    originalUrl: string; 

    @Column({length: 10, default: "", unique: true},)
    uniqueId: string; 

    @Column({default: 0})
    numberClicks: number; 

    @Column({length: 64, default: ""})
    user: string; 

    @CreateDateColumn()
    dateCreated: Date; 
}
