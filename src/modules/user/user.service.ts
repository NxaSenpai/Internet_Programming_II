import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  createUser(userData: Partial<User>) {
    return this.create(userData);
  }

  findAll() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  findOne(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

  getUser(username: string) {
    return this.usersRepo.findOne({ where: { username }, relations: ['tasks'] });
  }

  async update(id: number, updateData: Partial<User>) {
    await this.usersRepo.update(id, updateData);
    return this.findOne(id);
  }

  async updateUser(updateData: { username: string; email: string; password: string }) {
    await this.usersRepo.update({ username: updateData.username }, updateData);
    return this.getUser(updateData.username);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}
