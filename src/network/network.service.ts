import { Injectable } from '@nestjs/common';
import { Network } from './entities/network.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';


@Injectable()
export class NetworkService {

  constructor(
    @InjectRepository(Network)
    private readonly networkDocRepository: Repository<Network>
  ) {}

  async create(createNetworkDto: CreateNetworkDto) {
    return await this.networkDocRepository.save(createNetworkDto);
  }

  async findAll() {
    return await this.networkDocRepository.find();
  }

  async findOne(id: number) {
    return await this.networkDocRepository.findOneBy({ id });
  }

  async update(id: number, updateNetworkDto: UpdateNetworkDto) {
    return await this.networkDocRepository.update(id, updateNetworkDto);
  }

  async remove(id: number) {
    return await this.networkDocRepository.delete({ id });
  }
}
