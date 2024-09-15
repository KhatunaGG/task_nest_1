import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExpensesDto } from './dto/expenses.dto';
import exp from 'constants';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      type: 'www',
      price: 20,
      id: 1,
      name: 'nika',
      createdAt: new Date().toISOString(),
    },
    {
      type: 'ttt',
      price: 10,
      id: 2,
      name: 'sandro',
      createdAt: new Date().toISOString(),
    },
    {
      type: 'lll',
      price: 15,
      id: 3,
      name: 'luka',
      createdAt: new Date().toISOString(),
    },
    {
      type: 'eee',
      price: 5,
      id: 4,
      name: 'levani',
      createdAt: new Date().toISOString(),
    },
  ];

  getAllExpenses() {
    return this.expenses;
  }

  createExpense(expense: ExpensesDto): ExpensesDto {
    if (!expense.name || !expense.price || !expense.type)
      throw new HttpException(
        'Name, Type and Price are required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.expenses[this.expenses.length - 1]?.id || 1;
    const newExpense = {
      ...expense,
      id: lastId + 1,
      createdAt: new Date().toISOString(),
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  getExpenseById(id: number): ExpensesDto {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    return expense;
  }

  deleteExpense(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.BAD_REQUEST);
    const deletedExpense = this.expenses.splice(index, 1);
    return deletedExpense;
  }

  updateExpense(id: number, body: ExpensesDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const updatedExpense = {
      ...this.expenses[index],
      ...body,
    };
    this.expenses[index] = updatedExpense;
    return updatedExpense;
  }
}
