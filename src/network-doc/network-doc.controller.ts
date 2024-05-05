import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NetworkDocService } from './network-doc.service';
import { CreateNetworkDocDto } from './dto/create-network-doc.dto';
import { UpdateNetworkDocDto } from './dto/update-network-doc.dto';

@Controller('network-doc')
export class NetworkDocController {
  constructor(private readonly networkDocService: NetworkDocService) {}

  @Post()
  create(@Body() createNetworkDocDto: CreateNetworkDocDto) {
    return this.networkDocService.create(createNetworkDocDto);
  }

  @Get()
  findAll() {
    return this.networkDocService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networkDocService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNetworkDocDto: UpdateNetworkDocDto) {
    return this.networkDocService.update(+id, updateNetworkDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.networkDocService.remove(+id);
  }
}
