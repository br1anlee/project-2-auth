'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.recipe.hasMany(models.comment)
      models.recipe.belongsToMany(models.user, {through: "user_recipe"})
    }
  }
  recipe.init({
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instruction: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};