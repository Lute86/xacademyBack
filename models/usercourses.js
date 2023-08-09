'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userCourses.belongsTo(models.users, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      userCourses.belongsTo(models.courses, {
        foreignKey: 'courseId',
        targetKey: 'id',
      });
    }
  }
  userCourses.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserCourses',
    timestamps: true, 
    paranoid: true,
  });
  return userCourses;
};