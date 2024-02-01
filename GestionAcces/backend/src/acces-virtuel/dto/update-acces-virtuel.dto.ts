import { PartialType } from '@nestjs/swagger';
import { CreateAccesVirtuelDto } from './create-acces-virtuel.dto';

export class UpdateAccesVirtuelDto extends PartialType(CreateAccesVirtuelDto) {}
