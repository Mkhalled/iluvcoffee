import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  getAll() {
    // return 'This action returns all coffees ';
    return this.coffeeService.findAll();
  }

  @Get('/pagination')
  getPagination(@Query() queryPAgination) {
    const { limit, offset } = queryPAgination;
    return `This action returns all coffees : limit ${limit} and offset ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return `This action returns #${id} coffee `;
    const coffee = this.coffeeService.findOne(id);
    // if (!coffee) {
    //   throw new NotFoundException(`Coffee #${id} not found`);
    // }
    return this.coffeeService.findOne(id);
  }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeeService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action update #${id} coffee`;
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    // return `This action remove #${id} cofee`;
    return this.coffeeService.remove(id);
  }
}
