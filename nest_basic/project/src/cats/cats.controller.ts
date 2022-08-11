import { CatsService } from './cats.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats(): string {
    return this.catsService.getCats();
  }

  @Post()
  creatCat() {
    return 'post cat';
  }

  @Patch()
  updateCat() {
    return 'update cat';
  }

  @Delete()
  deleteCat() {
    return 'delete cat';
  }
}
