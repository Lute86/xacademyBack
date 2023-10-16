const { queries } = require("../models");
const { Op } = require("sequelize");

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
    if (options.all) {
      const allQueries = await queries.findAll();
      return allQueries;
    } else {
      const query = await queries.findAll({
        where: {
          [Op.or]: [{ id: options.id }, { reason: options.reason }],
        },
      });
      return query;
    }
  } catch (err) {
    console.error("Error when fetching Query", err);
    throw err;
  }
};

const deleteQuery = async (queryId) => {
  try {
    const query = await queries.findByPk(queryId);
    if (!query) {
      return {status: 404, action: "Find deleteQuery by PK", message:`Couldn't find a query with id ${queryId}`};
    }
    return query;
  } catch (err) {
    throw err;
  }
};

module.exports = { createQuery, getQueryByCriteria, deleteQuery };
