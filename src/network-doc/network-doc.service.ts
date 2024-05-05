import { Injectable } from '@nestjs/common';
import { CreateNetworkDocDto } from './dto/create-network-doc.dto';
import { UpdateNetworkDocDto } from './dto/update-network-doc.dto';

@Injectable()
export class NetworkDocService {
  create(createNetworkDocDto: CreateNetworkDocDto) {
    return 'This action adds a new networkDoc';
  }

  findAll() {
    return `This action returns all networkDoc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} networkDoc`;
  }

  update(id: number, updateNetworkDocDto: UpdateNetworkDocDto) {
    return `This action updates a #${id} networkDoc`;
  }

  remove(id: number) {
    return `This action removes a #${id} networkDoc`;
  }
}
