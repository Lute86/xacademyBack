'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      teachers.belongsToMany(models.courses, {
        through: 'TeacherCourses',
        foreignKey: 'teacherId',
        otherKey: 'courseId',
      });
    }
  }
  teachers.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'teachers',
    timestamps: true, 
    paranoid: true,
  });
  return teachers;
};