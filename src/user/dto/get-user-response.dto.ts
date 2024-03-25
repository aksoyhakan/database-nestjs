export class GetUserResponseDto {
  id: number;
  name: string;
  email: string;
  birthDay: Date;
  products: {
    name: string;
  }[];
}
