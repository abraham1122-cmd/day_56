


import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './order.service.js';
import { Patch } from '@nestjs/common';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService,
  ) {}

  // GET /api/orders/pending
  @Get('Pending')
  findPending() {
    return this.orderService.findPending();
  }


  @Get("restaurants/:id/orders")
  findByRestaurant(
    @Param("id", ParseIntPipe) id: number,
  ){
    return this.orderService.findByRestaurant(id)
  }

  // GET /api/orders/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch('orders/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ){
   return this.orderService.updateStatus(id, dto.status)
  }


  @Delete('orders/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number){

    return this.orderService.remove(id);
  }


  // POST /api/orders
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
