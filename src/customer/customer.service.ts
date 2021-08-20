import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: Repository<Customer>) {}

  async getCustomer(customerDto: CustomerDto, query: Record<string, unknown>) {
    return this.customerRepository.findOne({
      where: customerDto,
      relations: ['sample'],
      order: query,
    });
  }

  async createCustomer(customerDto: CustomerDto) {
    return this.customerRepository.create(customerDto);
  }

  async evaluate(customerDto: CustomerDto, customerId: number) {
    const result = await this.customerRepository.update(
      {
        id: customerId,
      },
      customerDto,
    );

    if (!result) throw new NotFoundException();
    return result;
  }
}
