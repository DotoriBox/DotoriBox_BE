import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverToken } from './token.entity';
import { Repository } from 'typeorm';
import { DriverTokenDto } from "./token.dto";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(DriverToken)
    private readonly driverTokenRepository: Repository<DriverToken>,
  ) {}

  async createDriverToken(driverTokenDto: DriverTokenDto) {

  }
}
