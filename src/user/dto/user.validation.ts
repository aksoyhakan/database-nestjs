import {
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const today = new Date();
          const birthday = new Date(value);
          const age = today.getFullYear() - birthday.getFullYear();
          return age > 18;
        },
      },
    });
  };
}
