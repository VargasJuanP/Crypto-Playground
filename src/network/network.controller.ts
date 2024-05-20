import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NetworkService } from './network.service';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { CreateNetworkDto } from './dto/create-network.dto';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post()
  create(@Body() network: CreateNetworkDto) {
    return this.networkService.create(network);
  }

  @Get()
  findAll() {
    return this.networkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() network: UpdateNetworkDto) {
    return this.networkService.update(+id, network);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.networkService.remove(+id);
  }
}
