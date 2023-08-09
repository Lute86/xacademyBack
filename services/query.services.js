const {queries} = require("../models");
const { Op } = require('sequelize')

const createQuery = async (query) => {
  try {
    const newQuery = await queries.create(query);
    return newQuery;
  } catch (err) {
    console.error("Error when creating Query", err);
    throw err;
  }
};


const getQueryByCriteria = async (options) => {
  try {
    const query = await queries.findAll({
      where: {
        [Op.or]: [
          { id: options.id },
          { reason: options.reason },
        ],
      },
    });
    return query;
  } catch (err) {
    console.error("Error when fetching Query", err);
    throw err;
  }
};



module.exports = { createQuery, getQueryByCriteria };
