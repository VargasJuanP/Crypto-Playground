import { PartialType } from '@nestjs/swagger';
import { CreateNetworkDocDto } from './create-network-doc.dto';

export class UpdateNetworkDocDto extends PartialType(CreateNetworkDocDto) {}
