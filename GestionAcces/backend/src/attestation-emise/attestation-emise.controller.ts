import { Controller, Get, Param, NotFoundException, Post } from '@nestjs/common';
import { AttestationEmiseService } from './attestation-emise.service';
import { AttestationEmiseDto } from './dtos/attestation-emise.dto';

@Controller('attestation-emise')
export class AttestationEmiseController {
  constructor(private readonly attestationEmiseService: AttestationEmiseService) {}

  @Get()
  async findAll() {
    return (await this.attestationEmiseService.findAll()).map(attestationEmise => AttestationEmiseDto.fromEntity(attestationEmise))
  }

  @Get(':id')
  async findOne(@Param('courriel') courriel: string) {
    const attestationEmise = await this.attestationEmiseService.findById(courriel);
    if (!attestationEmise) {
      throw new NotFoundException(`Attestation émise ${courriel} n'existe pas.`);
    }
    return AttestationEmiseDto.fromEntity(attestationEmise);
  }

  @Post(':id/revoke')
  async revoke(@Param('courriel') courriel: string) {
    const attestationEmise = await this.attestationEmiseService.findById(courriel);
    if (!attestationEmise) {
      throw new NotFoundException(`Attestation émise ${courriel} n'existe pas.`);
    }
    this.attestationEmiseService.revoke(attestationEmise);
    attestationEmise.revoked = true;
    this.attestationEmiseService.update(attestationEmise.courriel, attestationEmise);
    return AttestationEmiseDto.fromEntity(attestationEmise);
  }

}
