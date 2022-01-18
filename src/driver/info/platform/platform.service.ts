import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from './platform.entity';
import { Repository } from 'typeorm';
import { PlatformDto } from './platform.dto';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async getAllPlatform() {
    return this.platformRepository.find({ isDeleted: false });
  }

  async getDeletedAllPlatform() {
    return this.platformRepository.find({ isDeleted: true });
  }

  async getPlatformById(id: number) {
    return this.platformRepository.find({ id, isDeleted: false });
  }

  async createPlatform(platformDto: PlatformDto) {
    const platform = await this.platformRepository.findOne({
      ...platformDto,
      isDeleted: false,
    });

    console.log(platform);

    if (platform) throw new ConflictException();

    return this.platformRepository.save(platformDto);
  }

  async editPlatform(id: number, platformDto: PlatformDto) {
    const platform = await this.platformRepository.find({
      name: platformDto.name,
    });

    if (platform) throw new ConflictException();

    return this.platformRepository.update({ id }, platformDto);
  }

  async deletePlatform(id: number) {
    const platform = await this.platformRepository.find({
      id,
      isDeleted: false,
    });

    if (!platform) throw new NotFoundException();

    return this.platformRepository.update({ id }, { isDeleted: true });
  }
}
