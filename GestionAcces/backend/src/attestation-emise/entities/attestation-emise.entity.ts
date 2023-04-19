import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

const EMAIL_MAX_LENGTH = 254;

const GUID_LENGHT = 64;

@Entity()
export class AttestationEmise {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({length: EMAIL_MAX_LENGTH})
    email: string; 

    @Column({ type: 'timestamptz' })
    time: Date; 

    @Column({ type: 'int' })
    personneId: number; 

    @Column({ type: 'varchar', length: GUID_LENGHT })
    connectionId: string; 

    @Column({ type: 'varchar', length: GUID_LENGHT })
    credentialExchangeId: string; 

    @Column({ type: 'varchar', length: GUID_LENGHT })
    threadId: string; 

    @Column({ type: 'boolean', default: false })
    revoked: boolean;

}
