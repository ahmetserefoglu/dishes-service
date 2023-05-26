import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from './dish.schema';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class DishesService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    private readonly redisService: RedisService,
  ) {}

  async create(createDishDto: any): Promise<Dish> {
    const createdDish = new this.dishModel(createDishDto);
    const dish = createdDish.save();
    const cachedDish = this.redisService.set(createdDish.id, createdDish);

    await Promise.all([dish, cachedDish]);

    return dish;
  }

  async findAll(): Promise<Dish[]> {
    return this.dishModel.find().exec();
  }

  async findOne(id: string): Promise<Dish> {
    let dish = await this.redisService.get(id);

    if (!dish) {
      dish = await this.dishModel.findOne({ _id: id }).exec();
      await this.redisService.set(id, dish);
    }

    return dish;
  }

  async update(id: string, updateDishDto: any): Promise<Dish> {
    return this.dishModel.findByIdAndUpdate(id, updateDishDto, { new: true });
  }

  async delete(id: string): Promise<Dish> {
    return this.dishModel.findByIdAndDelete(id);
  }
}
