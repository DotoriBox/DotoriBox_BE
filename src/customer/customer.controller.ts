import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
import { StockService } from '../stock/stock.service';
import { StockDto } from '../stock/stock.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly stockService: StockService,
  ) {}

  @Post('')
  async createCustomer(
    @Body('customerDto') customerDto: CustomerDto,
    @Body('stockDto') stockDto: StockDto,
    @Body() body: any,
  ) {
    console.log(body);

    await this.stockService.useStock(stockDto);
    return this.customerService.createCustomer(customerDto);
  }

  @Post(':customerId/evaluate')
  async createEvaluate(
    @Param('customerId') customerId: number,
    @Body() customerDto: CustomerDto,
  ) {
    return this.customerService.evaluate(customerDto, customerId);
  }

  @Get('')
  async getCustomerInfo(@Body() customerDto: CustomerDto, @Query() query) {
    return this.customerService.getCustomer(customerDto, query);
  }
}
