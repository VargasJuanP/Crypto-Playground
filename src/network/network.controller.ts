import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpCode } from '@nestjs/common';
import { NetworkService } from './network.service';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { CreateNetworkDto } from './dto/create-network.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('networks')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  findAllMyNetworks(@Request() req: any) {
    return this.networkService.findAllMyNetworks(req.user);
  }

  @Get('me/:name')
  @UseGuards(AuthGuard)
  findMyNetwork(@Request() req: any, @Param('name') name: string) {
    return this.networkService.findMyNetwork(req.user, name);
  }

  @Post('me')
  @UseGuards(AuthGuard)
  createMyNetwork(@Request() req: any, @Body() network: CreateNetworkDto) {
    return this.networkService.createMyNetwork(req.user, network);
  }

  @Patch('me/:name')
  @UseGuards(AuthGuard)
  updateMyNetwork(@Request() req: any, @Param('name') name: string, @Body() network: UpdateNetworkDto) {
    return this.networkService.updateMyNetwork(req.user, name, network);
  }

  @Delete('me/:name')
  @UseGuards(AuthGuard)
  removeMyNetwork(@Request() req: any, @Param('name') name: string) {
    return this.networkService.removeMyNetwork(req.user, name);
  }

  @Post('commands')
  @HttpCode(200)
  getCommands(@Body() doc: any) {
    return this.networkService.getCommands(doc);
  }

}
