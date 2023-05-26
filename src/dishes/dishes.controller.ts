import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Dish } from './dish.schema';
import { DishesService } from './dishes.service';

@ApiTags('dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @ApiOperation({ summary: 'Create dish' })
  @ApiBody({ type: Dish, description: 'The dish to be created' })
  @ApiResponse({
    status: 201,
    description: 'The dish has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createDishDto: any) {
    return this.dishesService.create(createDishDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({ status: 200, description: 'Return all dishes.' })
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dish by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the dish' })
  @ApiResponse({ status: 200, description: 'Return the dish.' })
  findOne(@Param('id') id: string) {
    return this.dishesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a dish by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the dish' })
  @ApiBody({ type: Dish, description: 'The dish data to be updated' })
  @ApiResponse({
    status: 200,
    description: 'The dish has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateDishDto: any) {
    return this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dish by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the dish' })
  @ApiResponse({
    status: 200,
    description: 'The dish has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.dishesService.remove(id);
  }
}
