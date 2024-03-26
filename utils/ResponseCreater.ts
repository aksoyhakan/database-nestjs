import { LoginUserResponseDto } from 'src/user/dto/login-user-response';

export class ResponseCreator {
  public static constructLoginResponse(name: string, token: string) {
    return new LoginUserResponseDto(name, token);
  }
}
