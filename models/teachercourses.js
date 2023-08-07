'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacherCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      teacherCourses.belongsTo(models.teachers, {
        foreignKey: 'teacherId',
        targetKey: 'id',
      });
      teacherCourses.belongsTo(models.courses, {
        foreignKey: 'courseId',
        targetKey: 'id',
      });
    }
  }
  teacherCourses.init({
    teacherId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TeacherCourses',
    timestamps: true, 
    paranoid: true,
  });
  return teacherCourses;
};