import { Op } from 'sequelize'
import Award from './award.model'
import AwardType from './award-type.model'
import User from '../user/user.model'

class AwardService {
  public static async findAwardByUserId(user_id: string, type?: string, price?: number, limit?: number, offset?: number): Promise<any> {

    User.hasMany(Award);
    Award.belongsTo(User, { foreignKey: 'user_id', constraints: false, targetKey: 'user_id' });

    AwardType.hasMany(Award)
    Award.belongsTo(AwardType, { foreignKey: 'award_type_id', constraints: false, targetKey: 'award_type_id' });
    let where = { }
    if (type !== '' && type !== undefined && type !== null) {
      const types = type.split(',')
      if (types.length > 0)
        where = { ...where, ...{ award_type_id: types } }
    }

    if (price !== 0)
      where = { ...where, ...{ award_price: {
        [Op.lte] : price
      } } }


    return await Award.findAndCountAll({
      attributes: [
        'id',
        'award_id',
        'award_price',
        'award_description',
        'createdAt',
        'updatedAt'
      ],
      where, limit, offset, include: [
        {
          attributes:['user_email'],
          model: User,
          as: 'User',
          where: {
            user_id: {
              [Op.eq]: user_id
            }
          }
        }, {
          attributes:['award_type_name'],
          model: AwardType,
          as: 'AwardType'
        }]
    })
  }
}

export default AwardService
