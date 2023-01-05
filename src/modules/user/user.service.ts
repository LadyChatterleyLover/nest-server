import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../../interface/user.interface'
import { createPassword } from 'src/utils/cryptogram'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}
  /**
   * @description: 注册方法
   * @param {User} user
   * @return {*}
   */
  public async register(user: User) {
    const { username } = user
    const current = await this.userModel.findOne({ username })
    if (current) {
      return {
        code: 500,
        msg: '用户已存在',
      }
    } else {
      try {
        const p = await createPassword(user.password)
        const createUser = new this.userModel({
          username: user.username,
          password: p
        })
        await createUser.save()
        return {
          code: 200,
          msg: '注册成功',
        }
      } catch (error) {
        return {
          code: 200,
          msg: '注册失败' + error,
        }
      }
    }
  }
}
