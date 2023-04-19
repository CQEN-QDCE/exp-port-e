import { PartialType } from '@nestjs/swagger';
import { CreateRessPhysiqueDto } from './create-ress-physique.dto';

export class UpdateRessPhysiqueDto extends PartialType(CreateRessPhysiqueDto) {}
