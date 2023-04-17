import AwardType from './award-type.model'

class AwardTypeService {
  public static async findAll(): Promise<AwardType[]> {
    return await AwardType.findAll()
  }
}

export default AwardTypeService
