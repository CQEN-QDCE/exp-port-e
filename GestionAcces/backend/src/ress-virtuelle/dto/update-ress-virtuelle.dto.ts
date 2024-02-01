import { PartialType } from '@nestjs/swagger';
import { CreateRessVirtuelleDto } from './create-ress-virtuelle.dto';

export class UpdateRessVirtuelleDto extends PartialType(CreateRessVirtuelleDto) {}
