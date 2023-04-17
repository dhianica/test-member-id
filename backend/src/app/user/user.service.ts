import User from './user.model'

class UserService {
  public static async findAll(): Promise<User[]> {
    return await User.findAll()
  }

  public static async findById(id: number): Promise<User> {
    return await User.findOne({ where: { id } })
  }

  public static async findByEmail(user_email: string): Promise<User> {
    return await User.findOne({ where: { user_email } })
  }
}

export default UserService
