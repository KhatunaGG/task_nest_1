import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesDto } from './dto/expenses.dto';

@Controller('/expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
  }

  @Post()
  createExpense(@Body() body: ExpensesDto): ExpensesDto {
    return this.expensesService.createExpense(body);
  }

  @Get('/:id')
  getExpenseById(@Param('id') id: string): ExpensesDto {
    return this.expensesService.getExpenseById(Number(id));
  }

  @Delete('/:id')
  deleteExpense(@Param('id') id: string) {
    return this.expensesService.deleteExpense(Number(id));
  }

  @Put('/:id')
  updateExpense(@Param('id') id, @Body() body) {
    return this.expensesService.updateExpense(Number(id), body)
  }
}
