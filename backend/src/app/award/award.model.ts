
import { Configuration } from 'rebell-core';
import { Sequelize, Model, DataTypes } from 'sequelize';


const sequelize = new Sequelize(Configuration.get('MYSQL').value);
class Award extends Model {
  public declare id: number;
  public declare award_id: string;
  public declare award_type_id: string;
  public declare user_id: string;
  public declare award_price: number;
  public declare award_description: number;
}

Award.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    award_id: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    award_type_id: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    user_id: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    award_price: {
      type: new DataTypes.DECIMAL(10, 0),
      allowNull: false
    },
    award_description: {
      type: new DataTypes.STRING(128),
      allowNull: true
    }
  },
  {
    tableName: 'award',
    sequelize // passing the `sequelize` instance is required
  }
);

export default Award;

