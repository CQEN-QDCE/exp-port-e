import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { AttestationEmise } from './entities/attestation-emise.entity';

@Injectable()
export class AttestationEmiseService {
  
  constructor(@InjectRepository(AttestationEmise) private attestationEmiseRepository: Repository<AttestationEmise>,
                                                  private httpService: HttpService) {
  }

  async create(attestationEmise: AttestationEmise) {
    return await this.attestationEmiseRepository.save(attestationEmise);
  }

  async findAll() {
    return await this.attestationEmiseRepository.find(); 
  }

  async findById(id: number) {
    return await this.attestationEmiseRepository.findOneBy({id});
  }

  async findByEmail(email: string) {
    return await this.attestationEmiseRepository.findOne({ where: { email: email } });
  }

  async update(id: number, attestationEmise: AttestationEmise) {
    return await this.attestationEmiseRepository.update(id, attestationEmise); 
  }

  async remove(id: number) {
    return await this.attestationEmiseRepository.delete(id);
  }

  async revoke(attestationEmise: AttestationEmise): Promise<void> {
    let payload: any = {};
    payload['comment'] = '';
    payload['notify'] = true;
    payload['publish'] = true;
    if (attestationEmise.connectionId) payload['connection_id'] = attestationEmise.connectionId;
    if (attestationEmise.credentialExchangeId) payload['cred_ex_id'] = attestationEmise.credentialExchangeId;
    payload['notify_version'] = 'v1_0';
    //if (attestationEmise.revocationRegistryIdentifier) payload['rev_reg_id'] = attestationEmise.revocationRegistryIdentifier;
    if (attestationEmise.threadId) payload['thread_id'] = attestationEmise.threadId;
    const headersRequest = {
      'Content-Type': 'application/json',
      'x-api-key': process.env.AGENT_API_KEY
    };
    await firstValueFrom (
      this.httpService.post(`${process.env.AGENT_URL}/revocation/revoke`, payload, { headers: headersRequest }).pipe(
        catchError((error: any) => {
          console.log(error);
          throw error;
        }),
      ),
    );
  }
}
