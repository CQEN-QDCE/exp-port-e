import { PartialType } from '@nestjs/swagger';
import { CreateAccesPhysiqueDto } from './create-acces-physique.dto';

export class UpdateAccesPhysiqueDto extends PartialType(CreateAccesPhysiqueDto) {}
