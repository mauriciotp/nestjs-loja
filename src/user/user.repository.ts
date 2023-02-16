import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async emailExistis(email: string) {
    const possibleUser = this.users.find((user) => user.email === email);

    return possibleUser !== undefined;
  }

  private findById(id: string) {
    const possibleUser = this.users.find((userSaved) => userSaved.id === id);

    if (!possibleUser) {
      throw new Error('User not found');
    }

    return possibleUser;
  }

  async update(id: string, updateData: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.findById(id);
    this.users = this.users.filter((userSaved) => userSaved.id !== id);

    return user;
  }
}
