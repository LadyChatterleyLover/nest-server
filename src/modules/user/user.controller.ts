import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from 'src/auth/auth.service'
import { User } from '../../interface/user.interface'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: '用户注册',
  })
  async registerUser(@Body() user: User) {
    return await this.userService.register(user)
  }

  @ApiOperation({
    summary: '用户登录',
  })
  @Post('login')
  async login(@Body() loginParmas: User) {
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    )
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 2:
        return {
          code: 500,
          msg: `账号或密码不正确`,
        }
      default:
        return {
          code: 500,
          msg: `查无此人`,
        }
    }
  }
}
