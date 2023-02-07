import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userWithEmailExists = await this.userRepository.emailExistis(value);

    return !userWithEmailExists;
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (obj: Object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
