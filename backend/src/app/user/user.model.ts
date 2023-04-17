
import { Configuration } from 'rebell-core';
import { Sequelize, Model, DataTypes } from 'sequelize';


const sequelize = new Sequelize(Configuration.get('MYSQL').value);
class User extends Model {
  public declare id: number;
  public declare user_id: string;
  public declare user_email: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    user_email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'user',
    sequelize // passing the `sequelize` instance is required
  }
);

export default User;

