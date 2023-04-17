
import { Configuration } from 'rebell-core';
import { Sequelize, Model, DataTypes } from 'sequelize';


const sequelize = new Sequelize(Configuration.get('MYSQL').value);
class AwardType extends Model {
  public declare id: number;
  public declare award_type_id: string;
  public declare award_type_name: string;
}

AwardType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    award_type_id: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    award_type_name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'award_type',
    sequelize // passing the `sequelize` instance is required
  }
);

export default AwardType;

