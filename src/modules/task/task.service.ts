import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  create(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  createTask(taskData: Partial<Task>) {
    return this.create(taskData);
  }

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  getTask(id: string) {
    return this.findOne(parseInt(id));
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  async updateTask(id: string, updateData: Partial<Task>) {
    return this.update(parseInt(id), updateData);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }

  deleteTask(id: string) {
    return this.remove(parseInt(id));
  }

  async deleteAllTasks() {
    return this.tasksRepo.clear();
  }
}
