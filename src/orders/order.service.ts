
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { OrderRepository } from './order.repository.js';
import type { CreateOrderDto } from './dto/create-order.dto.js';
import { RestaurantsService } from '../restaurants/restaurants.service.js';
import { orderStatus } from './order.type.js';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,

    private readonly restaurantsService: RestaurantsService,
  ) {}

  // Get all orders
  findPending() {

    const orders = this.orderRepository.findAll();

    console.log("All orders", orders);



        // return this.orderRepository
        //     .findAll()
        //     .filter(order => order.status === 'Pending');
        return orders.filter(order => order.status === "Pending");
    }

    findByRestaurant(restaurantId: number){
       

      const restaurant = this.restaurantsService.findOne(restaurantId)

  if(!restaurant){
    throw new NotFoundException("Restaurants not found");
  }

      return this.orderRepository
        .findAll()
        .filter(order => order.restaurantId === restaurantId)
    }


    updateStatus(id: number, status: orderStatus){

      const order = this.orderRepository.findById(id)

      if(!order){

        throw new NotFoundException("order not found");
      }

      order.status = status;

      return order;

    }


    remove(id: number){

      const order = this.orderRepository.findById(id);

      if(!order){
        throw new NotFoundException("Order not found");

      }

      this.orderRepository.delete(id);
    }


  // Get one order by ID
  findOne(id: number) {
    const order = this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  // Create a new order
  create(dto: CreateOrderDto) {
    return this.orderRepository.create(dto);
  }
}
