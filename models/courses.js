'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      courses.belongsToMany(models.teachers, {
        through: 'TeacherCourses',
        foreignKey: 'courseId',
        otherKey: 'teacherId',
      });
      courses.belongsToMany(models.users, {
        through: 'UserCourses',
        foreignKey: 'courseId',
        otherKey: 'userId',
      });
    }
  }
  courses.init({
    course_name: DataTypes.STRING,
    description: DataTypes.STRING,
    modality: DataTypes.STRING,
    duration: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
    start_date: DataTypes.DATEONLY,
    finish_date: DataTypes.DATEONLY,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'courses',
    timestamps: true, 
    paranoid: true,
  });
  return courses;
};