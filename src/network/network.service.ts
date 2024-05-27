import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Network } from './entities/network.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { UsersService } from 'src/users/users.service';
import { Commands } from './commands/commands';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
    private readonly usersService: UsersService,
  ) {}

  async findAllMyNetworks(userId: number) {
    return await this.networkRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'name', 'lastUpdated']
    });
  }

  async findMyNetwork(userId: number, name: string) {
    const network = await this.networkRepository.findOne({
      where: { name, user: { id: userId } },
      select: ['id', 'name', 'doc']
    });

    if (!network) {
      throw new NotFoundException(`Network with name '${name}' not found`);
    }

    return network;
  }

  async createMyNetwork(userId: number, createNetworkDto: CreateNetworkDto) {
    const user = await this.usersService.findOne(userId);
    const network = this.networkRepository.create({ ...createNetworkDto, user });

    try {
        await this.networkRepository.save(network);
    } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Network with this name already exists for the user');
        }
        throw error;
    }

  }

  async updateMyNetwork(userId: number, name: string, updateNetworkDto: UpdateNetworkDto) {
    const network = await this.findMyNetwork(userId, name);
    Object.assign(network, updateNetworkDto);

    try {
        await this.networkRepository.save(network);
    } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Network with this name already exists for the user');
        }
        throw error;
    }

  }

  async removeMyNetwork(userId: number, name: string) {
    const network = await this.findMyNetwork(userId, name);
    await this.networkRepository.remove(network);
  }

  async getCommands(doc: any) {
    const commands = new Commands(doc);
    return commands;
  }
}
